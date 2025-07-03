import express from "express";
import {
  getAllPayrolls,
  createPayroll,
  updatePayroll
} from "../controllers/payrollcontroller.js";

const router = express.Router();

router.get("/", getAllPayrolls);
router.post("/", createPayroll);
router.put("/:id", updatePayroll); // 👈 Add this line for updating

export default router;
