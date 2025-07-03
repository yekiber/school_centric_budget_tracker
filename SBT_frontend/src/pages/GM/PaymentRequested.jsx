import React, { useState, useEffect } from "react";
import { FaInfoCircle, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LargeLoading from "../../components/loadings/LargeLoading";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/payments");
        if (Array.isArray(response.data)) {
          setPayments(response.data);
        } else {
          toast.error("Unexpected data format from API.");
        }
      } catch (error) {
        toast.error("Failed to fetch payment data.");
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) =>
    `${payment.student?.firstName} ${payment.student?.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm min-h-[80vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light text-gray-800">
          <FaMoneyBillWave className="inline mr-2" />
          Student Payments
        </h1>
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {loading ? (
        <LargeLoading />
      ) : filteredPayments.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 text-lg">
            {payments.length === 0
              ? "No payments found"
              : "No matching payments found"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Student</th>
                <th className="p-4 text-left">Grade</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    {payment.student?.firstName} {payment.student?.lastName}
                  </td>
                  <td className="p-4">{payment.student?.grade}</td>
                  <td className="p-4 font-medium">
                    ETB {payment.amount?.toLocaleString()}
                  </td>
                  <td className="p-4">{formatDate(payment.createdAt)}</td>
                  <td className="p-4">
                    <Link
                      to={`/general-manager-page/payment-requested/${payment._id}`}
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                      title="View Student Payment Details"
                    >
                      <FaInfoCircle className="mr-1" />
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentList;
