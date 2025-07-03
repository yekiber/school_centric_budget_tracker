import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// A sample functional component to manage Chapa payments
const ManageChapa = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  // Function to fetch the latest payment transactions
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/chapa/payments");
      console.log("API Response:", response.data);  // Debugging the response

      // Check if the response is an array and update the state
      if (Array.isArray(response.data)) {
        setPayments(response.data);
      } else {
        toast.error("Invalid data format received.");
      }
    } catch (error) {
      toast.error("Failed to fetch payment data.");
    } finally {
      setLoading(false);
    }
  };

  // Sample function for initiating a payment request (for testing purposes)
  const initiatePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/chapa/initiate-payment", {
        amount: 100, // For example, 100 currency units
      });
      toast.success("Payment initiated successfully!");
      fetchPayments(); // Refresh the list of payments
    } catch (error) {
      toast.error("Failed to initiate payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Manage Chapa Integration</h1>
      <p className="text-lg text-gray-600 mb-6">
        Easily manage payment processing and view transaction details with Chapa integration.
      </p>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={initiatePayment}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Initiate Payment
        </button>
        {loading && (
          <div className="text-gray-600">
            <span>Loading...</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Transactions</h2>
        {payments.length === 0 ? (
          <p>No recent payments found.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Transaction ID</th>
                <th className="border px-4 py-2 text-left">Amount</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="border px-4 py-2">{payment.transaction_id}</td>
                  <td className="border px-4 py-2">{payment.amount}</td>
                  <td
                    className={`border px-4 py-2 ${
                      payment.status === "success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="border px-4 py-2">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageChapa;