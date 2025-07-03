import React from 'react';

const PaymentHistory = () => {
  // Sample payment history data (replace with real data from props or API)
  const paymentHistory = [
    {
      id: 1,
      childName: "Emma",
      amount: 50.00,
      datePaid: "2025-02-28",
      status: "Completed",
      txRef: "tx-123456789",
    },
    {
      id: 2,
      childName: "Liam",
      amount: 50.00,
      datePaid: "2025-02-15",
      status: "Completed",
      txRef: "tx-123456788",
    },
    {
      id: 3,
      childName: "Emma",
      amount: 50.00,
      datePaid: "2025-02-01",
      status: "Failed",
      txRef: "tx-123456787",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Payment History</h1>

      {/* Payment History Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Past Payments</h2>
        {paymentHistory.length === 0 ? (
          <p className="text-gray-600 text-center">No payment history available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 font-semibold text-gray-700">Child Name</th>
                  <th className="p-4 font-semibold text-gray-700">Amount (ETB)</th>
                  <th className="p-4 font-semibold text-gray-700">Date Paid</th>
                  <th className="p-4 font-semibold text-gray-700">Status</th>
                  <th className="p-4 font-semibold text-gray-700">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-800">{payment.childName}</td>
                    <td className="p-4 text-gray-800">{payment.amount.toFixed(2)}</td>
                    <td className="p-4 text-gray-600">{payment.datePaid}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          payment.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{payment.txRef}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {paymentHistory.length > 0 && (
          <p className="mt-4 text-sm text-gray-500">
            Total Payments: {paymentHistory.length} | Total Amount Paid: ETB{' '}
            {paymentHistory
              .filter((p) => p.status === "Completed")
              .reduce((sum, p) => sum + p.amount, 0)
              .toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;