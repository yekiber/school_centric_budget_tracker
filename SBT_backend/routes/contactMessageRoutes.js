// routes/contactMessageRoutes.js
import express from "express";
import { deleteContactMessage, getAllContactMessages, sendContactMessage } from "../controllers/contactMessageController.js";

const router = express.Router();

// @route   POST /api/contact-messages/send
router.post("/send", sendContactMessage);
router.get("/", getAllContactMessages)
router.delete("/:id", deleteContactMessage)

export default router;
