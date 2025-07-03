import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingLarge from "../../components/loadings/LargeLoading";

const BudgetRequestedDetail = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/budget-requests/${id}`
        );
        if (res.data) {
          setRequest(res.data);
        } else {
          toast.warning("No budget found.");
        }
      } catch (err) {
        toast.error("Failed to load detail.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/budget-requests/${id}/status`, {
        status: newStatus,
      });
      toast.success(`Status updated to ${newStatus}`);
      navigate(-1); // Go back to previous page
    } catch (err) {
      toast.error("Failed to update.");
      console.error(err);
    }
  };

  if (loading) return <LoadingLarge />;
  if (!request)
    return <p className="text-center mt-5 text-gray-600">No data found.</p>;

  return (
    <div className=" bg-gray-100 mt-7 p-6 rounded-lg shadow-sm">
      <div className="flex justify-between mt-6">
        <h1 className="text-2xl font-bold mb-4">Budget Requested Details</h1>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="space-y-2">
      <p>
          <strong>Role:</strong> {request.requestedBy?.role || "N/A"}
        </p>
        <p>
          <strong>Requested By:</strong>{" "}
          {request.requestedBy?.firstName || "N/A"}
        </p>
        
        <p>
          <strong>Category:</strong> {request.category}
        </p>
        <p>
          <strong>Fiscal Year:</strong> {request.fiscalYear}
        </p>
        <p>
          <strong>Month:</strong> {request.month}
        </p>
        <p>
          <strong>Amount:</strong> ETB {request.amount}
        </p>
        <p>
          <strong>Description:</strong> {request.description}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {request.date ? new Date(request.date).toLocaleDateString() : "N/A"}
        </p>
        <p>
          <strong>Document:</strong>{" "}
          {request.file ? (
            <a
              href={`http://localhost:5000/uploads/${request.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View File
            </a>
          ) : (
            "No file uploaded"
          )}
        </p>
        <p>
          <strong>Status:</strong> {request.status}
        </p>
      </div>

      <div className="mt-6">
  {request.status === "Pending" ? (
    <div className="flex space-x-4">
      <button
        onClick={() => handleStatusChange("Approved")}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Approve
      </button>
      <button
        onClick={() => handleStatusChange("Rejected")}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Reject
      </button>
    </div>
  ) : (
    <p className="text-lg font-semibold text-blue-600">
      Status: {request.status}
    </p>
  )}
</div>
    </div>
  );
};

export default BudgetRequestedDetail;
