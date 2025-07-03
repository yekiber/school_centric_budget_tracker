import React, { useState, useEffect } from "react";

const ParentReceipt = () => {
  const [approvedReceipts, setApprovedReceipts] = useState([]);
  const [schoolFunds, setSchoolFunds] = useState([]);

  // Simulate fetching approved receipts and school funds (replace with actual API calls)
  useEffect(() => {
    const fetchedApprovedReceipts = [
      { id: 1, name: "Fitsum", grade: "Grade 3", amount: 100, date: "2025-03-05", status: "Approved" },
      { id: 2, name: "Habtamu", grade: "Grade 5", amount: 120, date: "2025-03-07", status: "Approved" },
    ];

    const fetchedSchoolFunds = [
      { id: 1, source: "Government Grant", amount: 5000, date: "2025-03-10" },
      { id: 2, source: "Private Donation", amount: 2000, date: "2025-03-15" },
    ];

    setApprovedReceipts(fetchedApprovedReceipts);
    setSchoolFunds(fetchedSchoolFunds);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-light text-gray-800 pt-10 mb-8 text-center">Total Revenue</h1>

      {/* Section 1: Approved Receipts (Student Monthly Fee) */}
      <div className="mb-8">
        <h2 className="text-2xl font-light text-blue-700 mb-4">Student Monthly Fee</h2>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          {approvedReceipts.map((receipt) => (
            <div key={receipt.id} className="p-4 bg-blue-50 rounded-lg flex justify-between items-center mb-2">
              <p className="font-medium text-gray-800">{receipt.name} (Grade: {receipt.grade})</p>
              <p className="text-sm text-gray-600">Amount: {receipt.amount} ETB</p>
              <p className="text-sm text-gray-500">{receipt.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Funds Given to the School */}
      <div>
        <h2 className="text-2xl font-light text-blue-700 mb-4">Funds</h2>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          {schoolFunds.length === 0 ? (
            <p className="text-center text-gray-600">No funds recorded.</p>
          ) : (
            schoolFunds.map((fund) => (
              <div key={fund.id} className="p-4 bg-green-50 rounded-lg flex justify-between items-center mb-2">
                <p className="font-medium text-gray-800">{fund.source}</p>
                <p className="text-sm text-gray-600">Amount: {fund.amount} ETB</p>
                <p className="text-sm text-gray-500">{fund.date}</p>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default ParentReceipt;
