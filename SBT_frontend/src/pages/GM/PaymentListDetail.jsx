import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LargeLoading from "../../components/loadings/LargeLoading"
import { FaArrowLeft, FaPrint, FaFileDownload } from "react-icons/fa";

const PaymentListDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("No payment ID provided");
      setError("Invalid Payment ID");
      setLoading(false);
      return;
    }
  
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payments/${id}`);
        if (response.data) {
          setPayment(response.data);
        } else {
          toast.error("Unexpected data format from API.");
        }
      } catch (error) {
        console.error("API Error:", error);
        setError("Failed to fetch details");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPayments();
  }, [id]);
  

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/payments/${id}/receipt`,
        {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `payment-receipt-${payment.txRef}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Failed to download receipt");
      console.error("Download Error:", error);
    }
  };

  if (loading) return <LargeLoading />;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!payment) return <div className="text-center mt-8">Payment not found</div>;

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm print:bg-white">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <div className="flex space-x-4">
          <button
            onClick={handlePrint}
            className="flex items-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
          >
            <FaPrint className="mr-2" />
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <FaFileDownload className="mr-2" />
            Download
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 print:shadow-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Payment Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Student Information</h3>
            <div className="space-y-3">
              <p><strong>Name:</strong> {payment.student?.firstName} {payment.student?.lastName}</p>
              <p><strong>Grade:</strong> {payment.student?.grade}</p>
              <p><strong>Student ID:</strong> {payment.student?.studentId}</p>
              <p><strong>Email:</strong> {payment.student?.email}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
            <div className="space-y-3">
              <p><strong>Transaction Ref:</strong> {payment.txRef}</p>
              <p><strong>Amount:</strong> ETB {payment.amount?.toLocaleString()}</p>     
              <p><strong>Date:</strong> {formatDate(payment.createdAt)}</p>
            </div>
          </div>
        </div>

        {payment.notes && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">Notes</h4>
            <p className="text-yellow-700">{payment.notes}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 print:shadow-none">
        <h3 className="text-lg font-semibold mb-4">Payment History</h3>
        {payment.student?.payments?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Reference</th>
                </tr>
              </thead>
              <tbody>
                {payment.student.payments.map((p, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{formatDate(p.createdAt)}</td>
                    <td className="p-3">ETB {p.amount?.toLocaleString()}</td>
                    <td className="p-3">{p.txRef}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No other payments found for this student.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentListDetail;