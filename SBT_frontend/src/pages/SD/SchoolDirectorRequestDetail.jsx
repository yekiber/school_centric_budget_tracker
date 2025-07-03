import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingLarge from "../../components/loadings/LargeLoading";
import { FaArrowLeft } from "react-icons/fa";

const SchoolDirectorRequestDetail = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/budget-requests/${id}`
        );
        setRequest(res.data);
      } catch (err) {
        toast.error("Failed to load request details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const getStatusBadge = (status) => {
    const value = (status || "").toLowerCase();
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          colors[value] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status || "Unknown"}
      </span>
    );
  };

  if (isLoading) return <LoadingLarge />;
  if (!request) return <div className="p-8 text-center">No request found</div>;

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-500">Request Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <div className="p-9">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Side */}
          <div className="space-y-6">
            <Section title="Budget Details">
              <DetailItem label="Category" value={request.category} />
              <DetailItem
                label="Fiscal Year"
                value={request.fiscalYear || "N/A"}
              />
              <DetailItem label="Month" value={request.month} />
              <DetailItem
                label="Amount"
                value={`ETB ${request.amount?.toLocaleString() || "0"}`}
              />
              <DetailItem
                label="Submitted Date"
                value={new Date(request.createdAt).toLocaleDateString()}
              />
              <DetailItem label="Description" value={request.description} />
            </Section>

            <Section title="Documentation">
              {request.file ? (
                <a
                  href={`http://localhost:5000/uploads/${request.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Document
                </a>
              ) : (
                <span className="text-gray-500">No document</span>
              )}
            </Section>
          </div>
          {/* Right Side */}
          <div className="space-y-6">
            <Section title="Status Information">
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                {getStatusBadge(request.status)}
              </div>
              <DetailItem
                label="Approved By"
                value={request.approvedBy?.firstName || "Pending"}
              />
              <DetailItem
                label="Approval Date"
                value={
                  request.Date
                    ? new Date(request.Date).toLocaleDateString()
                    : "N/A"
                }
              />
            </Section>
            <Section title="Description">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="whitespace-pre-line">
                  {request.description || "No description provided"}
                </p>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
    <div className="space-y-2 pl-4">{children}</div>
  </div>
);

const DetailItem = ({ label, value }) => (
  <p>
    <strong>{label}:</strong> {value || "N/A"}
  </p>
);

export default SchoolDirectorRequestDetail;
