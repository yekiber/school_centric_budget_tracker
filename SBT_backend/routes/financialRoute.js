import express from "express";
import { getFinancialOverview } from "../controllers/financialController.js";

const router = express.Router();

router.get("/", getFinancialOverview);

export default router;
