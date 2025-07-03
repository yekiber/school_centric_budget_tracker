import mongoose from "mongoose";

const budgetRequestSchema = new mongoose.Schema(
  {
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
      required: true,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
      required: false,
    },
    approvedAt: {
      type: Date,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    fiscalYear: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 50,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: false, 
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending", 
    },
  },
  { timestamps: true }
);

const BudgetRequest =
  mongoose.models.BudgetRequest ||
  mongoose.model("BudgetRequest", budgetRequestSchema);
export default BudgetRequest;
