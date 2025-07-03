import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingLarge from "../../components/loadings/LargeLoading";

const ProgramBudgetDetails = () => {
  const { id } = useParams();
  const [programBudget, setProgramBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedAmount, setEditedAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramBudgetDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/program-budgets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data) {
          setProgramBudget(res.data.data);
          setEditedAmount(res.data.data.amount || "");
        } else {
          toast.warning("No program budget found.");
        }
      } catch (err) {
        toast.error("Failed to load program budget details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgramBudgetDetail();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      // First update amount if it was edited
      if (parseFloat(editedAmount) !== programBudget.amount) {
        await axios.patch(
          `http://localhost:5000/api/program-budgets/${id}`,
          { amount: editedAmount },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      // Then update status
      await axios.patch(
        `http://localhost:5000/api/program-budgets/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(`Status updated to ${newStatus}`);
      navigate(-1);
    } catch (err) {
      toast.error("Failed to update status or amount.");
      console.error(err);
    }
  };

  if (loading) return <LoadingLarge />;
  if (!programBudget)
    return <p className="text-center mt-5 text-gray-600">No program budget found.</p>;

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm">
      <div className="flex justify-between mt-6">
        <h1 className="text-2xl font-bold mb-4">Program Budget Details</h1>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Program Title:</p>
            <p>{programBudget.title}</p>
          </div>
          <div>
            <p className="font-semibold">Fiscal Year:</p>
            <p>{programBudget.fiscalYear}</p>
          </div>
          <div>
            <p className="font-semibold">Amount:</p>
            <input
              type="number"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
              className="border border-gray-400 px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <p className="capitalize">{programBudget.status}</p>
          </div>
          <div>
            <p className="font-semibold">Requested By:</p>
            <p>{programBudget.requestedBy?.firstName || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Requested Date:</p>
            <p>{new Date(programBudget.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div>
          <p className="font-semibold">Description:</p>
          <p className="whitespace-pre-line">{programBudget.description}</p>
        </div>

        {programBudget.files && programBudget.files.length > 0 && (
          <div>
            <p className="font-semibold">Attached Files:</p>
            <div className="space-y-2">
              {programBudget.files.map((file, index) => (
                <a
                  key={index}
                  href={`http://localhost:5000/uploads/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline block"
                >
                  File {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        {programBudget.status === "Pending" ? (
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
            Status: {programBudget.status}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgramBudgetDetails;
