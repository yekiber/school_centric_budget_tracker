import BudgetRequest from "../models/BudgetRequestModel.js";
import Actor from "../models/actorModel.js";
import fs from "fs";

// ✅ Create Budget Request (Human Resource / Others)
export const createBudgetRequest = async (req, res) => {
  try {
    // Get user ID from request body instead of auth middleware
    const { requestedBy, category, fiscalYear, month, description, amount } = req.body;
    const file = req.file ? req.file.filename : null;

    if (!requestedBy || !category || !month || !description || amount === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    // Verify the requesting user exists
    const actor = await Actor.findById(requestedBy);
    if (!actor) {
      return res.status(404).json({ 
        success: false, 
        message: "Requesting user not found" 
      });
    }

    const newRequest = new BudgetRequest({
      requestedBy,
      category,
      fiscalYear: fiscalYear || undefined,
      month,
      amount: parseFloat(amount),
      description,
      file,
      status: 'Pending' // Make sure this is included
    });

    await newRequest.save();
    res.status(201).json({ 
      success: true, 
      data: newRequest,
      message: "Request success."
    });
    
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to request" 
    });
  }
};

// ✅ Get All Budget Requests (GM and Actor View)
export const getAllBudgetRequests = async (req, res) => {
  try {
    const requests = await BudgetRequest.find()
      .populate("requestedBy", "role firstName email")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: requests });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch" });
  }
};

// ✅ Get Single Budget Request
export const getBudgetRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const budgetRequest = await BudgetRequest.findById(id)
      .populate("requestedBy", "firstName role")
      .populate("approvedBy", "firstName  role");

    if (!budgetRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(budgetRequest);
  } catch (error) {
    console.error("Error fetching budget request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Budget Status (GM Only)
export const updateBudgetStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const updated = await BudgetRequest.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) return res.status(404).json({ success: false, message: "Request not found" });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};

// ✅ Update for requester (Before Approval)
export const updateBudgetRequest = async (req, res) => {
  try {
    const { category, fiscalYear, month, amount, description } = req.body;
    const { id } = req.params;

    let updateData = {
      category,
      fiscalYear,
      month,
      amount,
      description,
    };

    if (req.file) {
      updateData.file = req.file.filename;
    }

    const updatedRequest = await BudgetRequest.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Budget request not found" });
    }

    res.json({
      success: true,
      data: updatedRequest,
      message: "request updated successfully",
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Failed to update budget request" });
  }
};

// ✅ Delete for Requester (Before Approved or Rejected)
export const deleteBudgetRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await BudgetRequest.findById(id);

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    if (request.file) {
      fs.unlink(`uploads/${request.file}`, (err) => {
        if (err) console.warn("file delete warning:", err.message);
      });
    }

    await BudgetRequest.findByIdAndDelete(id);
    res.json({ success: true, message: "deleted successfully!" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete!" });
  }
};
