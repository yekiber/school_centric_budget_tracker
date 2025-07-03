import express from "express";
import { getTotalEmployee } from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getTotalEmployee);

export default router;
