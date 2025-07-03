import Student from "../models/studentModel.js";
import Payment from "../models/paymentModel.js";
import Chapa from "chapa";

const myChapa = new Chapa("CHASECK_TEST-J6yJZv2uvUsKQ4J6LB3PTMQQB35VOmOl");

export const initializePayment = async (req, res) => {
  try {
    const { studentId, amount, email, firstName, lastName, phoneNumber } = req.body;

    // ✅ Fixed: Added logical OR (||) operators for field validation
    if (!studentId || !amount || !email || !firstName || !lastName || !phoneNumber) {
      console.error("Missing required fields:", req.body);
      return res.status(400).json({ error: "Missing required fields" });
    }

    const student = await Student.findOne({ studentId: studentId });
    if (!student) {
      console.error("Student not found for ID:", studentId);
      return res.status(404).json({ error: "Student not found" });
    }

    const customerInfo = {
      amount: amount.toString(),
      currency: "ETB",
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      callback_url: `http://localhost:5000/api/payments/verify`,
      customization: {
        title: "School Fee Payment",
        description: "Payment for student fees",
      },
    };

    const response = await myChapa.initialize(customerInfo, { autoRef: true });
    if (response.status === "failed") {
      console.error("Payment Failed:", response.message);
      throw new Error(response.message);
    }

    const payment = new Payment({
      student: student._id,
      txRef: response.tx_ref,
      amount,
      currency: "ETB",
    });

    await payment.save();

    res.json({
      checkoutUrl: response.data.checkout_url,
      txRef: response.tx_ref,
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Payment initialization failed", 
      details: error.message 
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const txRef = req.query.tx_ref;
    if (!txRef) {
      return res.status(400).send("Transaction reference is required");
    }

    const response = await myChapa.verify(txRef);
    if (response.status === "failed") {
      throw new Error(response.message);
    }

    await Payment.updateOne({ txRef }, { status: response.status });
    res.redirect("http://localhost:3000/parent/payment-return");
  } catch (error) {
    res.status(500).send(`Verification failed: ${error.message}`);
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("student");

    // ✅ Fixed: Proper null checks for student fields
    const enrichedPayments = payments.map((payment) => {
      const student = payment.student || {};
      const studentName = `${student.firstName || ""} ${student.middleName || ""} ${student.lastName || ""}`.trim();

      return {
        _id: payment._id,
        studentName,
        grade: student.grade || "",
        txRef: payment.txRef,
        amount: payment.amount,
        currency: payment.currency,
        createdAt: payment.createdAt,
      };
    });

    res.json(enrichedPayments);
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    res.status(500).json({ 
      error: "Failed to fetch payments", 
      details: error.message 
    });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("student");
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    console.error("Failed to fetch payment:", error);
    res.status(500).json({ 
      error: "Failed to fetch payment", 
      details: error.message 
    });
  }
};
// import Student from "../models/studentModel.js"; // Import student model
// import Payment from "../models/paymentModel.js"; // Import payment model
// import Chapa from "chapa";

// const myChapa = new Chapa("CHASECK_TEST-J6yJZv2uvUsKQ4J6LB3PTMQQB35VOmOl");

// export const initializePayment = async (req, res) => {
//   try {
//     const { studentId, amount, email, firstName, lastName, phoneNumber } = req.body;

//     if (!studentId || !amount || !email || !firstName || !lastName || !phoneNumber) {
//       console.error("Missing required fields:", req.body);
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Find student by studentId
//     const student = await Student.findOne({ studentId: studentId });
//     if (!student) {
//       console.error("Student not found for ID:", studentId);
//       return res.status(404).json({ error: "Student not found" });
//     }

//     const customerInfo = {
//       amount: amount.toString(),
//       currency: "ETB",
//       email,
//       first_name: firstName,
//       last_name: lastName,
//       phone_number: phoneNumber,
//       callback_url: `http://localhost:5000/api/payments/verify`,
//       customization: {
//         title: "School Fee Payment",
//         description: "Payment for student fees",
//       },
//     };

//     const response = await myChapa.initialize(customerInfo, { autoRef: true });
//     if (response.status === "failed") {
//       console.error("Payment Failed:", response.message);
//       throw new Error(response.message);
//     }

//     // Save payment with correct student _id
//     const payment = new Payment({
//       student: student._id,  // ✅ Correct now
//       txRef: response.tx_ref,
//       amount,
//       currency: "ETB",
//     });

//     await payment.save();

//     res.json({
//       checkoutUrl: response.data.checkout_url,
//       txRef: response.tx_ref,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Payment initialization failed", details: error.message });
//   }
// };


// export const verifyPayment = async (req, res) => {
//   try {
//     const txRef = req.query.tx_ref;
//     if (!txRef) {
//       return res.status(400).send("Transaction reference is required");
//     }

//     const response = await myChapa.verify(txRef);

//     if (response.status === "failed") {
//       throw new Error(response.message);
//     }

//     await Payment.updateOne({ txRef }, { status: response.status });

//     res.redirect("http://localhost:3000/parent/payment-return");
//   } catch (error) {
//     res.status(500).send(`Verification failed: ${error.message}`);
//   }
// };

// // Fetch all payments
// export const getAllPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find().populate("student");
//     console.log("Fetched payments with students:", payments);
//     res.json(payments);
//   } catch (error) {
//     console.error("Failed to fetch payments:", error);
//     res
//       .status(500)
//       .json({ error: "Failed to fetch payments", details: error.message });
//   }
// };

// // Fetch payment by ID
// export const getPaymentById = async (req, res) => {
//   try {
//     const payment = await Payment.findById(req.params.id).populate("student");
//     if (!payment) {
//       return res.status(404).json({ error: "Payment not found" });
//     }
//     res.json(payment);
//   } catch (error) {
//     console.error("Failed to fetch payment:", error);
//     res.status(500).json({ error: "Failed to fetch payment", details: error.message });
//   }
// };

