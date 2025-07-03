import express from "express";
import { getStats } from "../controllers/statsController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getStats);

export default router;