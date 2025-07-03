import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC", "#FF4444"];

const DepartmentPayrollChart = ({ data }) => {
    if (!data || data.length === 0) {
      return (
        <div className="w-full h-96 bg-white rounded-2xl shadow p-4 flex items-center justify-center">
          <p className="text-gray-500">No payroll data available.</p>
        </div>
      );
    }
  
    return (
      <div className="w-full h-96 bg-white rounded-2xl shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="totalNetSalary"
              nameKey="department"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };
  export default DepartmentPayrollChart;
