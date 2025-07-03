import express from "express";
import multer from "multer"; // ⬅️ Add this!
import {
  createBudgetRequest,
  getAllBudgetRequests,
  updateBudgetStatus,
  updateBudgetRequest,
  deleteBudgetRequest,
  getBudgetRequestById,
} from "../controllers/BudgetRequestControllers.js";

const router = express.Router();

// 📸 Image storage config
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// 🚀 Endpoints
router.post("/send", upload.single("file"), createBudgetRequest);
router.get("/", getAllBudgetRequests);
router.get("/:id", getBudgetRequestById);
router.patch("/:id/status", updateBudgetStatus);
router.put("/:id", upload.single("file"), updateBudgetRequest);
router.delete("/:id", deleteBudgetRequest);

export default router;
