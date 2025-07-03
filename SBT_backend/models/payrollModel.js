import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  employeeId: String,
  staffName: String,
  department: String,
  basicSalary: Number,
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: Number,
  month: String,
  status: { type: String, default: "pending" }
}, { timestamps: true });

const Payroll = mongoose.model("Payroll", payrollSchema);

export default Payroll;
