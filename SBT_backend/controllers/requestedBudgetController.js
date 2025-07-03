import RequestedBudget from "../models/requestedBudgetModel.js"; // Import the model

// Controller to create a new budget request
export const createBudgetRequest = async (req, res) => {
  try {
    const { actor, budgetAmount, budgetPurpose, requestedBy, message } = req.body;

    // Create a new requested budget entry
    const newRequest = new RequestedBudget({
      actor,
      budgetAmount,
      budgetPurpose,
      requestedBy,  // Actor ID, assumed to be provided by the frontend
      message,
    });

    await newRequest.save(); // Save to the database

    res.status(201).json(newRequest); // Send the newly created request back to the client
  } catch (error) {
    res.status(500).json({ message: "Failed to create budget request", error });
  }
};

// Controller to get all budget requests
export const getAllBudgetRequests = async (req, res) => {
  try {
    const budgetRequests = await RequestedBudget.find()
      .populate('requestedBy', 'fullName')  // Populate requestedBy field with actor details
      .exec();

    res.status(200).json(budgetRequests);  // Return the budget requests
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch budget requests", error });
  }
};

// Controller to get a single budget request by its ID
export const getBudgetRequestById = async (req, res) => {
  const { id } = req.params;  // Get ID from URL parameters

  try {
    const budgetRequest = await RequestedBudget.findById(id)
      .populate('requestedBy', 'fullName')  // Populate requestedBy field with actor details
      .exec();

    if (!budgetRequest) {
      return res.status(404).json({ message: "Budget request not found" });
    }

    res.status(200).json(budgetRequest);  // Return the requested budget
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch budget request", error });
  }
};

// Controller to update the status of a budget request
export const updateBudgetRequestStatus = async (req, res) => {
  const { id } = req.params;  // Get ID from URL parameters
  const { status, approvedAmount } = req.body;  // Get updated status and approved amount from the request body

  try {
    const updatedRequest = await RequestedBudget.findByIdAndUpdate(
      id,
      { status, approvedAmount },  // Update the request with new status and approved amount
      { new: true }  // Return the updated document
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Budget request not found" });
    }

    res.status(200).json(updatedRequest);  // Return the updated request
  } catch (error) {
    res.status(500).json({ message: "Failed to update budget request", error });
  }
};

// Controller to delete a budget request
export const deleteBudgetRequest = async (req, res) => {
  const { id } = req.params;  // Get ID from URL parameters

  try {
    const deletedRequest = await RequestedBudget.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Budget request not found" });
    }

    res.status(200).json({ message: "Budget request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete budget request", error });
  }
};