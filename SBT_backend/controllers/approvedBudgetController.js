import ApprovedBudget from "../models/ApprovedBudgetModel.js"; // Import ApprovedBudget model
import Request from "../models/requestModel.js"; // Import Request model

// Approve or reject budget (General Manager action)
export const approveOrRejectBudget = async (req, res) => {
  try {
    const { requestId, approvedBy, status } = req.body;

    // Ensure required fields are provided
    if (!requestId || !approvedBy || !status) {
      return res.status(400).json({ message: "Request ID, approvedBy, and status are required" });
    }

    // Validate status value
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be 'approved' or 'rejected'." });
    }

    // Fetch the request to be approved or rejected
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (status === "approved") {
      // Store approved budget
      const approvedBudget = new ApprovedBudget({
        actor: request.actorId,
        category: request.requestCategory,
        amount: request.amount,
        description: request.description,
        approvedBy,
      });

      await approvedBudget.save();
    }

    // Remove the request from the submitted list (optional, based on your logic)
    await Request.findByIdAndDelete(requestId);

    res.status(200).json({ message: `Request ${status} successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch only approved budgets (Auditor view)
export const getApprovedBudgetsForAuditor = async (req, res) => {
  try {
    const approvedBudgets = await ApprovedBudget.find({}, "actor category amount approvedBy");
    res.status(200).json({ approvedBudgets });
  } catch (error) {
    res.status(500).json({ message: "Error fetching approved budgets", error: error.message });
  }
};
