import express from "express";
import {sendAdminMessage,getAdminMessages,deleteAdminMessage,} from "../controllers/adminMessageController.js";

const router = express.Router();

router.post("/send", sendAdminMessage);
router.get("/all", getAdminMessages);
router.delete("/:messageId", deleteAdminMessage);

export default router;