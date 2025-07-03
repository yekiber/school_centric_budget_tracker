import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingLarge from "../../components/loadings/LargeLoading";
import { FaArrowLeft } from "react-icons/fa";

const ManageStudentsDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/students/${id}`
        );
        setStudent(res.data);
      } catch (err) {
        toast.error("Failed to load request details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudentDetail();
  }, [id]);

  if (isLoading) return <LoadingLarge />;
  if (!student)
    return <div className="p-8 text-center">Error for student detail.</div>; //

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-500">Student Detail</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <div className="p-9">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Section title="Student Information">
            <DetailStudent label="Student ID" value={student.studentId} />
            <DetailStudent label="First Name" value={student.firstName} />
            <DetailStudent label="Middle Name" value={student.middleName} />
            <DetailStudent label="Last Name" value={student.lastName} />
            <DetailStudent label="Email" value={student.email} />
            <DetailStudent label="Phone Number" value={student.phoneNumber} />
            <DetailStudent label="Address" value={student.address} />
            <DetailStudent label="Grade" value={student.grade} />
            <DetailStudent label="Role" value={student.role} />
          </Section>

          <Section title="Payment Information">
            {student.paymentData &&
            Object.keys(student.paymentData).length > 0 ? (
              <>
                {Object.entries(student.paymentData).map(([key, value]) => (
                  <DetailStudent key={key} label={key} value={value} />
                ))}
              </>
            ) : (
              <p className="text-gray-500 italic pl-4">
                No payment data available.
              </p>
            )}
          </Section>
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

const DetailStudent = ({ label, value }) => (
  <p>
    <strong>{label}:</strong> {value || "N/A"}
  </p>
);

export default ManageStudentsDetail;
