import ProgramBudget from "../models/ProgramBudgetModel.js";
import Actor from "../models/actorModel.js";

// Helper to check if a value is a non-empty string
const isNonEmptyString = (value) => typeof value === "string" && value.trim() !== "";

// Create Program Budget
export const createProgramBudget = async (req, res) => {
  try {
    const { title, description, amount, category, requestedBy, fiscalYear } = req.body;

    // Validate required fields with proper checks
    const errors = {};
    if (!isNonEmptyString(title)) errors.title = "Title is required";
    if (!isNonEmptyString(description)) errors.description = "Description is required";
    if (amount === undefined || amount === null || isNaN(amount) || parseFloat(amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    }
    if (!isNonEmptyString(category)) errors.category = "Category is required";
    if (!isNonEmptyString(requestedBy)) errors.requestedBy = "Requested by is required";
    if (!isNonEmptyString(fiscalYear)) errors.fiscalYear = "Fiscal year is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // Verify requesting user exists
    const userExists = await Actor.exists({ _id: requestedBy });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "Requesting user not found",
      });
    }

    // Create and save new budget
    const newBudget = new ProgramBudget({
      title: title.trim(),
      description: description.trim(),
      amount: parseFloat(amount),
      category: category.trim(),
      requestedBy,
      fiscalYear: fiscalYear.trim(),
      status: "Pending",
    });

    const savedBudget = await newBudget.save();

    // Populate the requestedBy field in response
    const populatedBudget = await ProgramBudget.findById(savedBudget._id).populate(
      "requestedBy",
      "firstName lastName email"
    );

    return res.status(201).json({
      success: true,
      message: "Program budget created successfully",
      data: populatedBudget,
    });
  } catch (error) {
    console.error("Create Program Budget Error:", error);

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry",
        error: "This budget already exists",
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // Generic error response
    return res.status(500).json({
      success: false,
      message: "Failed to create program budget",
      error: error.message,
    });
  }
};

// Get All Program Budgets
export const getAllProgramBudgets = async (req, res) => {
  try {
    const budgets = await ProgramBudget.find()
      .populate("requestedBy", "firstName role email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: budgets });
  } catch (error) {
    console.error("Fetch Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch program budgets", error: error.message });
  }
};

// Get Single Program Budget by ID
export const getProgramBudgetById = async (req, res) => {
  try {
    const budget = await ProgramBudget.findById(req.params.id).populate("requestedBy", "firstName role");

    if (!budget) {
      return res.status(404).json({ success: false, message: "Program budget not found" });
    }

    res.status(200).json({ success: true, data: budget });
  } catch (error) {
    console.error("Get By ID Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch program budget", error: error.message });
  }
};

// Update Program Budget by ID
export const updateProgramBudget = async (req, res) => {
  try {
    const { title, description, amount, category, status, fiscalYear } = req.body;
    const { id } = req.params;

    const budget = await ProgramBudget.findById(id);
    if (!budget) {
      return res.status(404).json({ success: false, message: "Program budget not found" });
    }

    // Only allow updates before approval
    if (budget.status !== "Pending") {
      return res.status(400).json({ success: false, message: "Only pending requests can be updated" });
    }

    // Validate updated fields if provided
    const errors = {};
    if (title !== undefined && !isNonEmptyString(title)) errors.title = "Title must be a non-empty string";
    if (description !== undefined && !isNonEmptyString(description))
      errors.description = "Description must be a non-empty string";
    if (amount !== undefined && (isNaN(amount) || parseFloat(amount) <= 0))
      errors.amount = "Amount must be a positive number";
    if (category !== undefined && !isNonEmptyString(category)) errors.category = "Category must be a non-empty string";
    if (fiscalYear !== undefined && !isNonEmptyString(fiscalYear))
      errors.fiscalYear = "Fiscal year must be a non-empty string";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // Update fields if provided, else keep old
    if (title !== undefined) budget.title = title.trim();
    if (description !== undefined) budget.description = description.trim();
    if (amount !== undefined) budget.amount = parseFloat(amount);
    if (category !== undefined) budget.category = category.trim();
    if (status !== undefined) budget.status = status;
    if (fiscalYear !== undefined) budget.fiscalYear = fiscalYear.trim();

    const updatedBudget = await budget.save();

    res.status(200).json({ success: true, data: updatedBudget, message: "Updated successfully" });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Failed to update program budget", error: error.message });
  }
};

// Delete Program Budget by ID (Only if Pending)
export const deleteProgramBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await ProgramBudget.findById(id);
    if (!budget) {
      return res.status(404).json({ success: false, message: "Program budget not found" });
    }

    if (budget.status !== "Pending") {
      return res.status(400).json({ success: false, message: "Only pending requests can be deleted" });
    }

    await ProgramBudget.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Program budget deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete program budget", error: error.message });
  }
};
