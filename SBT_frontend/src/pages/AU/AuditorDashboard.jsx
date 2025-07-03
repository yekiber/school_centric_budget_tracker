import React from "react";

const Dashboard = () => {
  const dashboardData = {
    totalExpenditureItems: 10, // example number of expenditure items
    totalRevenueItems: 15, // example number of revenue items
    messages: [
      {
        id: 1,
        sender: "Finance Team",
        content: "New budget request requires your approval",
        date: "2025-03-05",
        priority: "high"
      },
      {
        id: 2,
        sender: "Audit Department",
        content: "Q2 financial report is ready for review",
        date: "2025-03-04",
        priority: "medium"
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto pt-10 p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 pt-10 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Expenditure Items */}
        <div className="bg-white rounded-xl pt-10 shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Total Expenditure 
          </h2>
          <p className="text-2xl font-bold text-gray-800">
            {dashboardData.totalExpenditureItems}
          </p>
        </div>

        {/* Total Revenue Items */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Total Revenue Items
          </h2>
          <p className="text-2xl font-bold text-green-600">
            {dashboardData.totalRevenueItems}
          </p>
        </div>

        {/* Messages Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Messages
          </h2>
          <div className="space-y-3">
            {dashboardData.messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 rounded-lg border-l-4 ${
                  message.priority === "high" 
                    ? "bg-red-50 border-l-red-500" 
                    : "bg-blue-50 border-l-blue-500"
                }`}
              >
                <h3 className="font-medium text-gray-800">{message.sender}</h3>
                <p className="text-gray-700 mt-1">{message.content}</p>
                <p className="text-sm text-gray-500 mt-2">{message.date}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            {dashboardData.messages.length} unread{" "}
            {dashboardData.messages.length === 1
              ? "message"
              : "messages"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;