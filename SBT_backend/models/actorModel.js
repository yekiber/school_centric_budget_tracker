import mongoose from "mongoose";

const actorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true }, // Ensure hashing before saving
    phoneNumber: { type: String, required: true, unique: true, index: true },
    address: { type: String, required: true },
    role: {
      type: String, 
      required: true,
      unique: true,
      enum: [
        "System Admin",
        "General Manager",
        "School Director", 
        "Auditor",
        "Resource and Finance",
        "Human Resource" // Standardized naming
      ],
    },
  },
  { timestamps: true }
);

const Actor = mongoose.models.Actor || mongoose.model("Actor", actorSchema);
export default Actor;