// controllers/contactMessageController.js
import ContactMessage from "../models/contactMessageModel.js";

export const sendContactMessage = async (req, res) => {
  try {
    const {
      recipientType,
      recipientDetail,
      userName,
      userEmail,
      userMessage,
    } = req.body;

    if (!recipientType || !userName || !userEmail || !userMessage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = new ContactMessage({
      recipientType,
      recipientDetail: recipientType === "specific_actor" ? recipientDetail : null,
      userName,
      userEmail,
      userMessage,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Send Contact Message Error:", error);
    res.status(500).json({ message: "Server error while sending message" });
  }
};

export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ message: "Server error fetching contact messages" });
  }
};
export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await ContactMessage.findByIdAndDelete(id);
    if (!msg) {
      return res.status(404).json({ message: "Message not found." });
    }
    res.json({ message: "Message deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Message." });
  }
};

