import React from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MdAssessment, MdReceiptLong } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";
import MonthlyExpenseBarChart from "../../components/charts/MonthlyExpenseBarChart";
import DepartmentPayrollChart from "../../components/charts/DepartmentPayrollChart";
// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ViewReport = () => {
  const { financialData } = useContext(StoreContext); // Assuming this is the correct context for financial data
  const { chartOverview } = useContext(StoreContext);

  // Destructure to get monthly and department data safely
  const monthlyData = chartOverview?.monthlyExpenses || [];
  const departmentData = chartOverview?.departmentPayroll || [];
  const reportData = [
    {
      title: "Total Revenue",
      value: financialData.totalRevenue,
      icon: <MdAssessment className="text-3xl text-green-600" />,
    },
    {
      title: "Total Expenses",
      value: financialData.totalExpenses,
      icon: <MdReceiptLong className="text-3xl text-red-600" />,
    },
    {
      title: "Net Profit",
      value: financialData.netProfit,
      icon: <FaBalanceScale className="text-3xl text-blue-600" />,
    },
  ];

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Budget vs Expenses",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `ETB${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  // Chart data
  const chartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Budget Expenses",
        data: monthlyData.map((item) => item.budgetExpenses),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Payroll Expenses",
        data: monthlyData.map((item) => item.payrollExpenses),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };
  if (!chartOverview) return <p className="p-6">Loading chart data...</p>;

  return (
    <div className="bg-gray-100 min-h-screen mt-7 p-6 rounded-2xl shadow-lg space-y-10">
      {/* General Report Section */}
      <div>
        <h1 className="text-center text-3xl font-bold text-blue-800 mb-10">
          General Report
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4 hover:shadow-lg transition duration-200"
            >
              <div className="text-4xl">{item.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">ETB {item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Overview with Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md h-[500px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Monthly Expenses
          </h3>
          <MonthlyExpenseBarChart data={monthlyData} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md h-[500px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Department Payroll
          </h3>
          <DepartmentPayrollChart data={departmentData} />
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
