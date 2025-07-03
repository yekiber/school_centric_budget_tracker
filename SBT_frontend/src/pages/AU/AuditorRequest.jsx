import React, { useState } from "react";
import Modal from "../../components/Modal";

const AuditorRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Initially, the modal is not open
  const [submittedBudgets, setSubmittedBudgets] = useState([]); // Store submitted budgets

  // Handle the form submission
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form submitted with values:", values);

    // Create a new submitted budget entry
    const newBudget = {
      id: submittedBudgets.length + 1,
      category: values.requestCategory,
      approvedAmount: values.amount || 0, // Default to 0 if no amount is provided
    };

    // Add the new budget to the submitted budgets list
    setSubmittedBudgets((prevBudgets) => [...prevBudgets, newBudget]);

    setSubmitting(false);
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-light text-gray-800 mb-8 text-center">
        Request Budget
      </h1>

      {/* Button to generate the form */}
      <div className="text-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)} // Open the form modal when clicked
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
           Budget Request
        </button>
      </div>

      {/* Modal for the form */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="Request Budget"
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)} // Close the modal on button click
          submitButtonText="Submit"
        />
      )}

      <div className="mt-6">
        {/* Display the newly added budget requests right below the form */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Submitted Budget Requests</h2>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="space-y-3">
            {submittedBudgets.length === 0 ? (
              <p className="text-center text-gray-600">No budget requests submitted yet.</p>
            ) : (
              submittedBudgets.map((budget) => (
                <div
                  key={budget.id}
                  className="p-3 bg-green-50 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{budget.category}</p>
                    <p className="text-sm text-gray-600">Requested Amount: ${budget.approvedAmount}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditorRequest;
