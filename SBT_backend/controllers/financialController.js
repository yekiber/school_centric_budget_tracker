import AnnualBudget from "../models/annualBudgetModel.js";
import OtherFund from "../models/otherFundModel.js";
import Payment from "../models/paymentModel.js";
import BudgetRequest from "../models/BudgetRequestModel.js";
import Payroll from "../models/payrollModel.js";
import { aggregateExpensesByMonth, aggregatePayrollByDepartment } from "../utils/financialHelpers.js";
export const getFinancialOverview = async (req, res) => {
  try {
    // Annual Budget total
    const annualBudgets = await AnnualBudget.find();
    const annualBudget = annualBudgets.reduce((sum, item) => sum + item.allocatedBudget, 0);

    // Other Funds total
    const otherFunds = await OtherFund.find();
    const otherFundTotal = otherFunds.reduce((sum, item) => sum + item.allocatedFund, 0);

    // Student Fees total
    const payments = await Payment.find();
    const studentFees = payments.reduce((sum, item) => sum + item.amount, 0);
    
    // === NEW: Calculate Total Expenses ===

    // 1. Approved Budget Requests
    const approvedBudgetRequests = await BudgetRequest.find({ status: "Approved" });
    const approvedBudgetExpenses = approvedBudgetRequests.reduce(
      (sum, request) => sum + request.amount,
      0
    );

    // 2. Payroll Total
    const payrolls = await Payroll.find();
    const payrollExpenses = payrolls.reduce(
      (sum, item) => sum + (item.netSalary || 0),
      0
    );

    // Total Expenses = Approved Budget Expenses + Payroll
    const totalExpenses = approvedBudgetExpenses + payrollExpenses;

    // Total Revenue
    const totalRevenue = annualBudget + otherFundTotal + studentFees;

    // Net Profit
    const netProfit = totalRevenue - totalExpenses;
    const monthlyExpenses = await aggregateExpensesByMonth();
    const departmentPayroll = await aggregatePayrollByDepartment();

    res.json({
      annualBudget,
      otherFundTotal,
      studentFees,
      totalRevenue,
      totalExpenses,
      netProfit, 
      monthlyExpenses,
      departmentPayroll,
    });
  } catch (err) {
    console.error("Error fetching financial data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
