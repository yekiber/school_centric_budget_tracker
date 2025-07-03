import mongoose from "mongoose";

// Define the Student Schema
const StudentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true, index: true },
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    phoneNumber: { type: String, required: true, match: [/^\d{10}$/, "Phone number must be 10 digits"] },
    address: { type: String, required: true, trim: true },
    grade: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ["Student"], default: "Student" },
  },
  { timestamps: true, minimize: false }
);

const StudentModel = mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default StudentModel;
