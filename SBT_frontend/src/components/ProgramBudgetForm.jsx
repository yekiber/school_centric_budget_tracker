import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const ProgramBudgetForm = ({
  budget,
  requestedBy,
  isEditMode = false,
  onSuccess,
  onCancel,
  submitButtonText = "Submit",
}) => {
  // Add description and category state
  const [title, setTitle] = useState(budget?.title || "");
  const [description, setDescription] = useState(budget?.description || "");
  const [category, setCategory] = useState(budget?.category || "");
  const [fiscalYear, setFiscalYear] = useState(budget?.fiscalYear || "");
  const [amount, setAmount] = useState(budget?.amount || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode && budget) {
      setTitle(budget.title || "");
      setDescription(budget.description || "");
      setCategory(budget.category || "");
      setFiscalYear(budget.fiscalYear || "");
      setAmount(budget.amount || "");
    }
  }, [budget, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend simple validation
    if (!title || !description || !category || !fiscalYear || !amount) {
      toast.error("All fields are required");
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      toast.error("Amount must be a positive number");
      return;
    }

    if (!requestedBy) {
      toast.error("Requester information missing");
      return;
    }

    if (!API_BASE_URL) {
      toast.error("API URL is not defined. Check your .env file.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        title,
        description,
        category,
        fiscalYear,
        amount,
        requestedBy,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };

      let response;
      if (isEditMode) {
        response = await axios.put(`${API_BASE_URL}/program-budgets/${budget._id}`, data, config);
      } else {
        response = await axios.post(`${API_BASE_URL}/program-budgets`, data, config);
      }

      toast.success("Program budget submitted successfully");
      onSuccess(response.data.data);
    } catch (err) {
      console.error("Submission error:", err);
      // Show backend validation error message if any
      toast.error(err.response?.data?.message || "Failed to submit program budget");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Fiscal Year</label>
        <input
          type="text"
          value={fiscalYear}
          onChange={(e) => setFiscalYear(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2"
          min="0"
          step="0.01"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded hover:opacity-90 transition-opacity shadow-lg"
        >
          {isSubmitting ? "Submitting..." : submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default ProgramBudgetForm;
