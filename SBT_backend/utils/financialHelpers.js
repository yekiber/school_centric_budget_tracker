// financialHelpers.js

import BudgetRequest from "../models/BudgetRequestModel.js";
import Payroll from "../models/payrollModel.js";

export const aggregateExpensesByMonth = async () => {
  const budgetExpenses = await BudgetRequest.aggregate([
    { $match: { status: "Approved" } },
    {
      $group: {
        _id: "$month",
        totalBudgetExpenses: { $sum: "$amount" },
      },
    },
  ]);

  const payrollExpenses = await Payroll.aggregate([
    {
      $group: {
        _id: "$month",
        totalPayroll: { $sum: "$netSalary" },
      },
    },
  ]);

  const monthlySummary = {};

  budgetExpenses.forEach(({ _id, totalBudgetExpenses }) => {
    monthlySummary[_id] = {
      month: _id,
      budgetExpenses: totalBudgetExpenses,
      payrollExpenses: 0,
    };
  });

  payrollExpenses.forEach(({ _id, totalPayroll }) => {
    if (!monthlySummary[_id]) {
      monthlySummary[_id] = {
        month: _id,
        budgetExpenses: 0,
        payrollExpenses: totalPayroll,
      };
    } else {
      monthlySummary[_id].payrollExpenses = totalPayroll;
    }
  });

  return Object.values(monthlySummary).map((item) => ({
    ...item,
    totalExpenses: item.budgetExpenses + item.payrollExpenses,
  }));
};

export const aggregatePayrollByDepartment = async () => {
  const result = await Payroll.aggregate([
    {
      $group: {
        _id: "$department",
        totalNetSalary: { $sum: "$netSalary" },
        count: { $sum: 1 },
      },
    },
  ]);

  return result.map((item) => ({
    department: item._id,
    totalNetSalary: item.totalNetSalary,
    employeeCount: item.count,
  }));
};
