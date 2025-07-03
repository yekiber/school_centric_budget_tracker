import React, { useState, useEffect } from "react";
import { FaInfoCircle, FaMoneyCheckAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LargeLoading from "../../components/loadings/LargeLoading";
import { BUDGET_STATUS } from "../../shared/constants";

const ProgramBudgetRequests = () => {
  const [programBudgets, setProgramBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProgramBudgets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/program-budgets",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Match the response structure from the second component
        const data = response.data?.data || [];
        setProgramBudgets(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch program budgets");
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramBudgets();
  }, []);

  const filteredProgramBudgets = programBudgets.filter((budget) =>
    budget.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    budget.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    budget.fiscalYear?.toString().includes(searchTerm)
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
          Program Budget Requests
        </h1>
        <input
          type="text"
          placeholder="Search by program, status, or year..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {loading ? (
        <LargeLoading />
      ) : programBudgets.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 text-lg">No program budgets found</p>
        </div>
      ) : filteredProgramBudgets.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 text-lg">No matching program budgets found</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Program Title</th>
                <th className="p-4 text-left">Fiscal Year</th>
                <th className="p-4 text-left">Amount (ETB)</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Requested Date</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProgramBudgets.map((budget) => (
                <tr
                  key={budget._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">{budget.title}</td>
                  <td className="p-4">{budget.fiscalYear}</td>
                  <td className="p-4 font-medium">
                    ETB {budget.amount?.toLocaleString() || "0"}
                  </td>
                  <td className="p-4">{getStatusBadge(budget.status)}</td>
                  <td className="p-4">
                    {new Date(budget.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <Link
                      to={`/general-manager-page/program-budget-requests/${budget._id}`}
                      className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
                      title="View Program Budget Details"
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

export default ProgramBudgetRequests;