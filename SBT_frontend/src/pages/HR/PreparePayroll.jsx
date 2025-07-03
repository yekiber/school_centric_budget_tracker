import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPayroll from "../../components/payroll/AddPayroll";
import { FiPlusCircle } from 'react-icons/fi';

const API_BASE_URL = 'http://localhost:5000/api/payrolls'; // Adjusted for real API call

const PreparePayroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPayrollForm, setShowPayrollForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const notify = (message, type = 'success') => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const fetchPayrolls = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(API_BASE_URL);
      setPayrolls(res.data); // Use actual API data
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || err.message || "Failed to load payrolls");
      notify('Failed to load payroll data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayrollAdded = (newPayroll) => {
    notify("Setted successfully!");
    setPayrolls(prev => [...prev, newPayroll]);
    setShowPayrollForm(false);
  };

  const handleAddPayrollClick = (employee) => {
    setSelectedEmployee(employee);
    setShowPayrollForm(true);
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm">
      <ToastContainer />

      <h1 className="text-3xl font-light text-blue-800 mb-8 text-center">
        Payroll Management 
      </h1>

      <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-700 p-4 border-b">
          Employee Payroll Records
        </h2>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-3 text-gray-600">Loading payroll...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={fetchPayrolls}
              className="mt-3 bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200 transition-colors"
            >
              Retry Loading
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allowances</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payrolls.map((payroll) => (
                  <tr key={payroll._id || payroll.employeeId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payroll.employeeId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payroll.staffName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payroll.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payroll.basicSalary?.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payroll.allowances?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payroll.deductions?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payroll.month || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payroll.netSalary?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleAddPayrollClick(payroll)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Add Payroll"
                      >
                        <FiPlusCircle className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showPayrollForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Submit Payroll for {selectedEmployee.staffName}</h3>
              <AddPayroll 
                employee={selectedEmployee} 
                onSuccess={handlePayrollAdded}
                onCancel={() => setShowPayrollForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreparePayroll;
