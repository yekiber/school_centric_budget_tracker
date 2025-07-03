const ParentDashboard = () => {
    // Sample data for a parent's dashboard
    const parentData = {
      children: [
        { id: 1, name: "Emma", age: 8 },
        { id: 2, name: "Liam", age: 6 },
      ],
      upcomingPayments: [
        { id: 1, childName: "Emma", dueDate: "2025-03-10", amount: 50.0 },
        { id: 2, childName: "Liam", dueDate: "2025-03-15", amount: 50.0 },
      ],
      notifications: [
        { id: 1, message: "Emma's payment due soon", date: "2025-03-02" },
        { id: 2, message: "Liam's school event tomorrow", date: "2025-03-01" },
      ],
    };
  
    return (
      <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
        {/* Header */}
        <h1 className="text-3xl font-light text-gray-800 mt-20 mb-8 text-center">
          Student Dashboard
        </h1>
  
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Children Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              My Children
            </h2>
            <div className="space-y-3">
              {parentData.children.map((child) => (
                <div
                  key={child.id}
                  className="flex justify-between items-center p-3 bg-blue-50 rounded-lg"
                >
                  <span className="font-medium text-gray-800">{child.name}</span>
                  <span className="text-sm text-gray-600">Age: {child.age}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Total: {parentData.children.length}{" "}
              {parentData.children.length === 1 ? "child" : "children"}
            </p>
          </div>
  
          {/* Upcoming Payments Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Upcoming Payments
            </h2>
            <div className="space-y-3">
              {parentData.upcomingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {payment.childName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Due: {payment.dueDate}
                    </p>
                  </div>
                  <p className="font-semibold text-green-600">
                    ${payment.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Total due: $
              {parentData.upcomingPayments
                .reduce((sum, p) => sum + p.amount, 0)
                .toFixed(2)}
            </p>
          </div>
  
          {/* Notifications Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Notifications
            </h2>
            <div className="space-y-3">
              {parentData.notifications.map((notification) => (
                <div key={notification.id} className="p-3 bg-red-50 rounded-lg">
                  <p className="text-gray-800">{notification.message}</p>
                  <p className="text-sm text-gray-600">{notification.date}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              {parentData.notifications.length} new{" "}
              {parentData.notifications.length === 1
                ? "notification"
                : "notifications"}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ParentDashboard;
  