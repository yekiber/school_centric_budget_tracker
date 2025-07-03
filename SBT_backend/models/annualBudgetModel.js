import mongoose from "mongoose";

const annualBudgetSchema = new mongoose.Schema({
  year: { type: String, required: true, unique: true },  // e.g., 2024
  allocatedBudget: { type: Number, required: true }      // Main number allocated
}, { timestamps: true });

const AnnualBudget = mongoose.models.AnnualBudget || mongoose.model("AnnualBudget", annualBudgetSchema);
export default AnnualBudget;
