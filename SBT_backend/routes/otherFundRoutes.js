import express from 'express'
import { getOtherFund, setOtherFund } from "../controllers/otherFundController.js";

const router = express.Router();
router.post("/", setOtherFund);
router.get("/:year", getOtherFund);// use year us Id ok

export default router

