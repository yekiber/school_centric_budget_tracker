import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LargeLoading from "../../components/loadings/LargeLoading";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../../components/Modal";
import ProgramBudgetForm from "../../components/ProgramBudgetForm";

const ProgramBudgetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [programBudget, setProgramBudget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchProgramBudget = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/program-budgets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProgramBudget(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch program budget");
        toast.error("Failed to load program budget details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgramBudget();
  }, [id]);

  const handleBack = () => {
    navigate("/human-resource-page/program-budget");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this program budget?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/program-budgets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Program budget deleted successfully");
      handleBack();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.message || "Failed to delete program budget");
    }
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    // Refresh the data
    const fetchProgramBudget = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/program-budgets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProgramBudget(res.data.data);
      } catch (err) {
        console.error("Refresh error:", err);
      }
    };
    fetchProgramBudget();
  };

  if (isLoading) return <LargeLoading />;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!programBudget) return <div className="p-8 text-center">Program budget not found</div>;

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
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <button
              onClick={handleBack}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <FaArrowLeft className="mr-2" /> Back to Program Budgets
            </button>
            
            {programBudget.status === "Pending" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                  title="Edit"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700 flex items-center"
                  title="Delete"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {programBudget.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Fiscal Year</h2>
              <p className="mt-1 text-lg font-medium">{programBudget.fiscalYear}</p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">Amount</h2>
              <p className="mt-1 text-lg font-medium">
                {programBudget.amount?.toLocaleString() || "0"}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">Status</h2>
              <div className="mt-1">
                {getStatusBadge(programBudget.status)}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">Category</h2>
              <p className="mt-1 text-lg font-medium capitalize">
                {programBudget.category || "N/A"}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">Requested By</h2>
              <p className="mt-1 text-lg font-medium">
                {programBudget.requestedBy?.firstName} {programBudget.requestedBy?.lastName}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">Submitted Date</h2>
              <p className="mt-1 text-lg font-medium">
                {new Date(programBudget.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500">Description</h2>
            <p className="mt-1 text-gray-700 whitespace-pre-line">
              {programBudget.description || "No description provided"}
            </p>
          </div>

          {/* Edit Modal */}
          <Modal
            isOpen={isEditModalOpen}
            title="Edit Program Budget"
            onClose={() => setIsEditModalOpen(false)}
          >
            <ProgramBudgetForm
              budget={programBudget}
              isEditMode={true}
              onSuccess={handleEditSuccess}
              onCancel={() => setIsEditModalOpen(false)}
              submitButtonText="Update Budget"
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProgramBudgetDetail;