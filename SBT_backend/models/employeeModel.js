import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  staffName: { type: String, required: true },
  department: { type: String },
  basicSalary: { type: Number, default: 0 },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: { type: Number, default: 0 },
  month: { type: String }, // e.g., "2025-04"
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
