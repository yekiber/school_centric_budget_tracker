import React from "react";

const resourceData = {
    totalBudgetsReviewed: 25,
    pendingApprovals: 5,
    completedAudits: 18,
    messages: [
      { 
        id: 1, 
        sender: "Budget Committee", 
        content: "New budget request requires your approval", 
        date: "2025-03-05",
        priority: "high"
      },
      { 
        id: 2, 
        sender: "Finance Team", 
        content: "Q2 resource allocation report is ready for review", 
        date: "2025-03-04",
        priority: "medium"
      },
    ],
};

const ResourceAndFinanceHeadDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-light text-gray-800 mb-8 pt-7 text-center">
        Resource & Finance Head Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Messages Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Messages</h2>
          <div className="space-y-3">
            {resourceData.messages.map((message) => (
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
            {resourceData.messages.length} unread{" "}
            {resourceData.messages.length === 1 ? "message" : "messages"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourceAndFinanceHeadDashboard;