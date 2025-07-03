import mongoose from "mongoose";

// Define schema for admin messages
const adminMessageSchema = new mongoose.Schema(
  {
    recipientType: {
      type: String,
      required: true,
      enum: ["actors", "student_parents", "specific_actor", "specific_student"],
    },
    recipientDetail: {
      type: String,
      default: null, // Email for Actor, Student ID for Parent
    },
    message: {
      type: String,
      required: true,
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
      required: true,
    },
  },
  { timestamps: true }
);

// Create the AdminMessage model
const AdminMessage = mongoose.models.AdminMessage || mongoose.model("AdminMessage", adminMessageSchema);

export default AdminMessage;