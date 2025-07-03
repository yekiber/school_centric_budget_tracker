import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const ABP = () => {
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [auditReport, setAuditReport] = useState(null);
  const [chartData, setChartData] = useState({});
  const [isAuditing, setIsAuditing] = useState(false);

  useEffect(() => {
    // Simulate fetching total expenditure from an API or database
    const fetchExpenditure = async () => {
      try {
        const expenditureData = [
          { id: 1, program: "Science Program", approvedAmount: 5000 },
          { id: 2, program: "Math Program", approvedAmount: 3000 },
        ];
        const totalExp = expenditureData.reduce((sum, budget) => sum + budget.approvedAmount, 0);
        setTotalExpenditure(totalExp);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    // Simulate fetching total revenue from an API or database
    const fetchRevenue = async () => {
      try {
        const revenueData = [
          { id: 1, source: "Government Grant", amount: 5000 },
          { id: 2, source: "Private Donation", amount: 2000 },
        ];
        const totalRev = revenueData.reduce((sum, revenue) => sum + revenue.amount, 0);
        setTotalRevenue(totalRev);
      } catch (error) {
        console.error("Error fetching revenue:", error);
      }
    };

    fetchExpenditure();
    fetchRevenue();
  }, []);

  const startAudit = () => {
    setIsAuditing(true);

    const status = totalRevenue >= totalExpenditure ? "Balanced" : "Deficit";
    setAuditReport({ totalExpenditure, totalRevenue, status });

    setChartData({
      labels: ["Total Expenditure", "Total Revenue"],
      datasets: [
        {
          label: "Financial Overview",
          data: [totalExpenditure, totalRevenue],
          backgroundColor: ["red", "green"],
        },
      ],
    });
  };

  const submitToGM = () => {
    console.log("Submitting audit report to General Manager:", auditReport);
    alert("Report submitted");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-light text-blue-800 pt-10 mb-8 text-center">
         Budget Performance
      </h1>
      <div className="text-center mb-6">
        <button
          onClick={startAudit}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Start Auditing
        </button>
      </div>
      {isAuditing && auditReport && (
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Audit Report</h2>
            <p className="text-gray-800">Total Expenditure: {auditReport.totalExpenditure} ETB</p>
            <p className="text-gray-800">Total Revenue: {auditReport.totalRevenue} ETB</p>
            <p className={`font-semibold ${auditReport.status === "Balanced" ? "text-green-600" : "text-red-600"}`}>
              Status: {auditReport.status}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Financial Overview Graph</h2>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
          <div className="text-center">
            <button
              onClick={submitToGM}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Submit Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ABP;