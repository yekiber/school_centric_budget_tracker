import express from "express";
import multer from "multer";
import fs from "fs/promises";
import { submitRequest, getAllRequests } from "../controllers/requestController.js";


const router = express.Router();

// Ensure the "uploads" directory exists before storing files
const uploadDir = "uploads";
await fs.mkdir(uploadDir, { recursive: true }).catch((err) => console.error("Error creating uploads directory:", err));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/submit", upload.array("attachments", 5), submitRequest);
router.get("/request", getAllRequests);

export default router;
