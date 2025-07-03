import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
} from "recharts";

const MonthlyExpenseBarChart = ({ data }) => {
  return (
    <div className="w-full h-96 bg-white rounded-2xl shadow p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budgetExpenses" fill="#8884d8" name="Budget Expenses" />
          <Bar dataKey="payrollExpenses" fill="#82ca9d" name="Payroll Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenseBarChart;
