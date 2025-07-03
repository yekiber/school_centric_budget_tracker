// frontend/src/components/PaymentReturn.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentReturn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally verify payment status here with another API call
    setTimeout(() => navigate("/"), 3000); // Redirect to home after 3 seconds
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Payment Processing
      </h1>
      <p className="text-gray-600">
        Your payment is being processed. You will be redirected shortly...
      </p>
    </div>
  );
};

export default PaymentReturn;
