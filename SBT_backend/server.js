import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import authRoute from "./routes/authRoute.js"; // Import all routes
import paymentRoute from "./routes/paymentRoute.js"; // Import payment routes
import contactMessageRoutes from "./routes/contactMessageRoutes.js";
import adminMessageRoutes from "./routes/adminMessageRoutes.js";
import statsRoutes from "./routes/statsRoute.js";
import payrollRoute from "./routes/payrollRoute.js";
import BudgetRequestRoutes from './routes/BudgetRequestRoutes.js';
import annualBudgetRoutes from './routes/annualBudgetRoutes.js';
import otherFundRoutes from './routes/otherFundRoutes.js';
import financialRoute from "./routes/financialRoute.js";
import employeeRoutes from './routes/employeeRoutes.js'; // Import employee routes
import path from 'path';
import { fileURLToPath } from 'url';
import programBudgetRoutes from "./routes/programBudgetRoutes.js";

dotenv.config();
const app = express();
// Get directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// **Middlewares**
app.use(express.json()); // Add this line
app.use(cors());
// Middleware for parsing JSON
app.use(express.json()); // Parse JSON bodies (as sent by API clients)
// CORS configuration
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Connect to Database
const connectToDatabase = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Error connecting to DB:", error.message);
    process.exit(1);
  }
};

connectToDatabase();


// **all API Routes**
app.use("/api/auth", authRoute);   // Actor related routes
app.use("/api/payments", paymentRoute); // Payment related routes
app.use("/api/contact-messages", contactMessageRoutes);
app.use("/api/admin-messages", adminMessageRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/employee", employeeRoutes); // Employee related routes
app.use("/api/payrolls", payrollRoute);
app.use("/api/annual-budget", annualBudgetRoutes); // Annual budget routes
app.use("/api/other-fund", otherFundRoutes); // Other fund routes
app.use('/api/budget-requests', BudgetRequestRoutes); // Budget request routes
app.use("/api/financials", financialRoute);
app.use("/api/program-budgets", programBudgetRoutes);
// Serve uploads folder
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
// Default Route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📂 Serving uploads from: ${path.join(__dirname, 'uploads')}`);
});