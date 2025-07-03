import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SetBudget = () => {
  const [year, setYear] = useState("");
  const [allocatedBudget, setAllocatedBudget] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [fundYear, setFundYear] = useState("");
  const [allocatedFund, setAllocatedFund] = useState("");
  const [isSubmittingAnnual, setIsSubmittingAnnual] = useState(false);
  const [isSubmittingFund, setIsSubmittingFund] = useState(false);

  const handleSubmitAnnual = async (e) => {
    e.preventDefault();
    // Validate year first
    if (!year || year.toString().length !== 4) {
      toast.error("Please enter a valid 4-digit year");
      return;
    }
    setIsSubmittingAnnual(true);
    try {
      await axios.post("http://localhost:5000/api/annual-budget/", {
        year,
        allocatedBudget,
      });
      toast.success("Budget allocated!");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to allocate budget");
    } finally {
      setIsSubmittingAnnual(false);
    }
  };

  const handleSubmitOtherFund = async (e) => {
    e.preventDefault();
    // Validate year first
    if (!fundYear || fundYear.toString().length !== 4) {
      toast.error("Please enter a valid 4-digit year");
      return;
    }
    setIsSubmittingFund(true);
    try {
      await axios.post("http://localhost:5000/api/other-fund/", {
        organizationName,
        allocatedFund,
        fundYear,
      });
      toast.success("Fund allocated!");
      // Clear form after successful submission
      setOrganizationName("");
      setAllocatedFund("");
      setFundYear("");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to allocate funds");
    } finally {
      setIsSubmittingFund(false);
    }
  };

  return (
    <div className="mt-7 rounded-lg shadow-sm bg-gray-100 min-h-[90vh] py-10 px-4">
      <h1 className="text-center text-3xl font-light text-blue-800 mb-10">
        Set Budgets
      </h1>

      <div className="max-w-6xl mx-auto">
        {/* Annual Budget */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold text-blue-700 mb-5">
            📅 Annual Budget
          </h2>
          <form onSubmit={handleSubmitAnnual} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Year
              </label>
              <input
                type="number"
                placeholder="e.g., 2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Allocated Budget
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={allocatedBudget}
                onChange={(e) => setAllocatedBudget(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmittingAnnual}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition ${
                isSubmittingAnnual ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmittingAnnual ? "Setting..." : "Set Budget"}
            </button>
          </form>
        </div>

        {/* Other Funds */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 w-full">
          <h2 className="text-xl font-semibold text-blue-700 mb-5">
            🏢 Other Funds
          </h2>
          <form onSubmit={handleSubmitOtherFund} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Year
              </label>
              <input
                type="number"
                placeholder="e.g., 2024"
                value={fundYear}
                onChange={(e) => setFundYear(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Organization Name
              </label>
              <input
                type="text"
                placeholder="e.g., NGO..."
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Fund Amount
              </label>
              <input
                type="number"
                placeholder="e.g., 50000"
                value={allocatedFund}
                onChange={(e) => setAllocatedFund(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition ${
                isSubmittingFund ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmittingFund ? "Setting..." : "Set Fund"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetBudget;
