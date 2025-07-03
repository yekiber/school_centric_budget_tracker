import express from "express";
import { initializePayment, verifyPayment, getAllPayments, getPaymentById } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/initialize", initializePayment); 
router.get("/verify", verifyPayment);          
router.get("/", getAllPayments); 
router.get("/:id", getPaymentById);              

export default router;