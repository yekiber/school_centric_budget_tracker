import React, { useState, useEffect } from "react";
import { FaInfoCircle, FaMoneyCheckAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LargeLoading from "../../components/loadings/LargeLoading";

const BudgetRequested = () => {
  const [isRequests, setIsRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/budget-requests"
        );
        if (response.data.success && Array.isArray(response.data.data)) {
          setIsRequests(response.data.data);
        } else {
          toast.error("Unexpected data format.");
        }
      } catch (error) {
        toast.error("Failed to fetch data.");
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = isRequests.filter((request) =>
    request.requestedBy?.role
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusClass =
      {
        pending: "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
      }[status?.toLowerCase()] || "bg-gray-100 text-gray-800";

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
      >
        {status || "Unknown"}
      </span>
    );
  };

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm min-h-[80vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          <FaMoneyCheckAlt className="inline mr-2" />
          Requested Budgets
        </h1>
        <input
          type="text"
          placeholder="Search by requester role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {loading ? (
        <LargeLoading />
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 text-lg">
            {isRequests.length === 0
              ? "No requests found"
              : "No matching requests found"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Requested By</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Month</th>
                <th className="p-4 text-left">Amount (ETB)</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr
                  key={request._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">{request.requestedBy?.role || "Unknown"}</td>
                  <td className="p-4">{request.category}</td>
                  <td className="p-4">{request.month}</td>
                  <td className="p-4 font-medium">
                    ETB {request.amount?.toLocaleString()}
                  </td>
                  <td className="p-4">{getStatusBadge(request.status)}</td>
                  <td className="p-4 text-center">
                    <Link
                      to={`/general-manager-page/budget-requested/${request._id}`}
                      className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
                      title="View Budget Request Details"
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

export default BudgetRequested;
