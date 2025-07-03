import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import ProgramBudgetForm from "../../components/ProgramBudgetForm";
import axios from "axios";
import { toast } from "react-toastify";
import LargeLoading from "../../components/loadings/LargeLoading";
import { FaPlus, FaInfoCircle, FaTrash, FaEdit } from "react-icons/fa";
import { BUDGET_STATUS } from "../../shared/constants";

const ProgramBudget = () => {
  const [programBudgets, setProgramBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserId = user?.actorId || user?._id;

  const fetchProgramBudgets = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/program-budgets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProgramBudgets(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch program budgets");
      toast.error("Failed to load program budgets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgramBudgets();
  }, []);

  const processedProgramBudgets = useMemo(() => {
    let result = [...programBudgets];
    if (filter !== "all") {
      result = result.filter(
        (b) => b.status === BUDGET_STATUS[filter.toUpperCase()]
      );
    }
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key],
          bVal = b[sortConfig.key];
        if (typeof aVal === "string")
          return sortConfig.direction === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        if (typeof aVal === "number")
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        return 0;
      });
    }
    return result;
  }, [programBudgets, filter, sortConfig]);

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

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

  const handleDelete = async (budgetId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this program budget?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/program-budgets/${budgetId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProgramBudgets((prev) => prev.filter((b) => b._id !== budgetId));
      toast.success("Program budget deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.message || "Failed to delete program budget");
    }
  };

  const handleEditClick = (budget) => {
    setCurrentBudget(budget);
    setIsEditModalOpen(true);
  };

  const handleCreateSuccess = (newBudget) => {
    console.log("Budget created:", newBudget);
    setIsCreateModalOpen(false);
    fetchProgramBudgets();
  };

  const handleEditSuccess = (updatedBudget) => {
    console.log("Budget updated:", updatedBudget);
    setIsEditModalOpen(false);
    fetchProgramBudgets();
  };

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Program Budgets</h1>
          <div className="flex space-x-2">
            {["all", "pending", "approved", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md capitalize ${
                  filter === f
                    ? `bg-${f === "all" ? "blue" : f}-500 text-white`
                    : "bg-white border border-gray-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
            title="Create New Program Budget"
          >
            <FaPlus size={18} />
          </button>
        </div>

        {/* Create Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          title="New Program Budget"
          onClose={() => setIsCreateModalOpen(false)}
        >
          <ProgramBudgetForm
            requestedBy={currentUserId}
            onSuccess={handleCreateSuccess}
            onCancel={() => {
              console.log("Form cancelled");
              setIsCreateModalOpen(false);
            }}
            submitButtonText="Submit to General Manager"
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          title="Edit Program Budget"
          onClose={() => setIsEditModalOpen(false)}
        >
          {currentBudget && (
            <ProgramBudgetForm
              budget={currentBudget}
              isEditMode={true}
              requestedBy={currentUserId}
              onSuccess={handleEditSuccess}
              onCancel={() => {
                console.log("Form cancelled");
                setIsEditModalOpen(false);
              }}
              submitButtonText="Update Budget"
            />
          )}
        </Modal>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <LargeLoading />
          ) : error ? (
            <div className="p-8 text-center text-red-600">{error}</div>
          ) : processedProgramBudgets.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No program budgets found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["title", "fiscalYear", "amount", "status", "createdAt", "requestedBy"].map((col) => (
                      <th
                        key={col}
                        onClick={() => requestSort(col)}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      >
                        {col === "requestedBy" 
                          ? "Requested By" 
                          : col
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (s) => s.toUpperCase())
                        }
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {processedProgramBudgets.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.fiscalYear}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {item.amount?.toLocaleString() || "0"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.requestedBy?.firstName || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-4">
                          <Link
                            to={`/human-resource-page/program-budget/${item._id}`}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <FaInfoCircle size={18} />
                          </Link>
                          {item.status?.toLowerCase() === "pending" && (
                            <>
                              <button
                                onClick={() => handleEditClick(item)}
                                className="text-blue-500 hover:text-blue-700"
                                title="Edit"
                              >
                                <FaEdit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                              >
                                <FaTrash size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramBudget;
