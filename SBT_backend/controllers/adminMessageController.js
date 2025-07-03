import Message from "../models/adminMessageModel.js";
import Actor from "../models/actorModel.js";
import Student from "../models/studentModel.js";

// Send a message from the admin
export const sendAdminMessage = async (req, res) => {
  const { recipientType, recipientDetail, message } = req.body;
  const adminId = "67ced47ac50c85edc23f8bf6"; // Hardcoded for now (Replace with req.user.id if using auth middleware)

  try {
    let recipientQuery = {};

    if (recipientType === "specific_actor") {
      recipientQuery = { email: recipientDetail };
    } else if (recipientType === "specific_student") {
      recipientQuery = { studentId: recipientDetail };
    }

    let recipientFound = true;

    if (recipientType === "specific_actor") {
      recipientFound = await Actor.findOne(recipientQuery);
    } else if (recipientType === "specific_student") {
      recipientFound = await Student.findOne(recipientQuery);
    }

    if (!recipientFound) {
      return res.status(404).json({ message: "Recipient not found." });
    }

    const newMessage = new Message({
      recipientType,
      recipientDetail,
      message,
      sentBy: adminId,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Send Admin Message Error:", error);
    res.status(500).json({ message: "Failed to send message.", error });
  }
};

// Get all messages (for Admin view)
export const getAdminMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate("sentBy", "email createdAt");

    res.status(200).json(messages);
  } catch (error) {
    console.error("Fetch Admin Messages Error:", error);
    res.status(500).json({ message: "Failed to fetch messages.", error });
  }
};

// Delete a message
export const deleteAdminMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }

    await message.deleteOne();
    res.status(200).json({ message: "Message deleted successfully!" });
  } catch (error) {
    console.error("Delete Admin Message Error:", error);
    res.status(500).json({ message: "Failed to delete message.", error });
  }
};