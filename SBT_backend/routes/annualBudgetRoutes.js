import express from 'express'
import { allocateAnnualBudget, getAnnualBudget } from "../controllers/annualBudgetController.js";

const router = express.Router();
router.post("/", allocateAnnualBudget);
router.get("/:year", getAnnualBudget);

export default router

