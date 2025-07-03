// models/contactMessageModel.js
import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    recipientType: {
      type: String,
      enum: ["specific_actor", "all_actors"],
      required: true,
    },
    recipientDetail: {
      type: String,
      required: function () {
        return this.recipientType === "specific_actor";
      },
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userMessage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
export default ContactMessage;
