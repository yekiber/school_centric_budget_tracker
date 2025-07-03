import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Chapa API configuration
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const CHAPA_API_URL = "https://api.chapa.co/v1/transaction";

// Get student payment data
router.get("/", (req, res) => {
  console.log("Payments endpoint hit");
  res.json({ children: students });
});

// Initialize payment with Chapa
router.post("/initialize", async (req, res) => {
  const { selectedPayments, parentEmail, parentName, parentPhone } = req.body;

  if (!selectedPayments || selectedPayments.length === 0) {
    return res.status(400).json({ error: "No payments selected" });
  }

  const totalAmount = students
    .filter((student) => selectedPayments.includes(student.id))
    .reduce((sum, student) => sum + student.amountDue, 0);

  const tx_ref = `tx-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  const paymentData = {
    amount: totalAmount.toString(),
    currency: "ETB",
    email: parentEmail || "parent@example.com",
    first_name: parentName?.split(" ")[0] || "Parent",
    last_name: parentName?.split(" ")[1] || "Name",
    phone_number: parentPhone || "0912345678",
    tx_ref,
    callback_url: "http://localhost:5000/api/payments/callback",
    return_url: "http://localhost:5173/payment-return",
    "customization[title]": "School Fee Payment",
    "customization[description]": "Payment for student fees",
  };

  try {
    const response = await axios.post(
      `${CHAPA_API_URL}/initialize`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      status: "success",
      checkout_url: response.data.data.checkout_url,
      tx_ref,
    });
  } catch (error) {
    console.error("Chapa initialization error:", error.response?.data || error);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

// Callback endpoint for Chapa (webhook)
router.post("/callback", async (req, res) => {
  const { tx_ref } = req.body;

  try {
    const response = await axios.get(`${CHAPA_API_URL}/verify/${tx_ref}`, {
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
      },
    });

    if (response.data.status === "success") {
      students.forEach((student) => {
        if (selectedPayments.includes(student.id)) {
          student.paid = true;
        }
      });
      res.status(200).send("Payment verified");
    } else {
      res.status(400).send("Payment verification failed");
    }
  } catch (error) {
    console.error("Chapa verification error:", error.response?.data || error);
    res.status(500).send("Verification error");
  }
});

export default router;