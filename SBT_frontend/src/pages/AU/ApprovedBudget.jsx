import React, { useState, useEffect } from "react";

const ApprovedExpenditure = () => {
  const [approvedBudgets, setApprovedBudgets] = useState({
    "School Director": [],
    "Human Resource Head": [],
    "Resource and Finance Head": [],
  });

  // Simulate fetching categorized approved budgets (replace with real data fetching)
  useEffect(() => {
    const fetchedBudgets = [
      { id: 1, category: "School Director", program: "New Classroom Construction", approvedAmount: 10000 },
      { id: 2, category: "School Director", program: "Library Expansion", approvedAmount: 8000 },
      { id: 3, category: "Human Resource Head", program: "Staff Training Program", approvedAmount: 4000 },
      { id: 4, category: "Human Resource Head", program: "Employee Welfare Fund", approvedAmount: 3000 },
      { id: 5, category: "Resource and Finance Head", program: "Science Lab Renovation", approvedAmount: 7000 },
      { id: 6, category: "Resource and Finance Head", program: "School Bus Maintenance", approvedAmount: 5000 },
    ];

    // Categorizing the budgets
    const categorizedBudgets = {
      "School Director": fetchedBudgets.filter(budget => budget.category === "School Director"),
      "Human Resource Head": fetchedBudgets.filter(budget => budget.category === "Human Resource Head"),
      "Resource and Finance Head": fetchedBudgets.filter(budget => budget.category === "Resource and Finance Head"),
    };

    setApprovedBudgets(categorizedBudgets);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-light text-gray-800 mb-8 text-center">
        Total Expenditure
      </h1>

      {/* Loop through each category */}
      {Object.keys(approvedBudgets).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-light text-blue-700 mb-4">{category}</h2>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            {approvedBudgets[category].length === 0 ? (
              <p className="text-center text-gray-600">No approved budgets available.</p>
            ) : (
              approvedBudgets[category].map((budget) => (
                <div key={budget.id} className="p-3 bg-green-50 rounded-lg flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium text-gray-800">{budget.program}</p>
                    <p className="text-sm text-gray-600">Amount: {budget.approvedAmount} ETB</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApprovedExpenditure;