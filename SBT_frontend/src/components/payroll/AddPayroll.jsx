import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPayroll = ({ employee, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    _id: employee._id || '',
    employeeId: employee.employeeId,
    staffName: employee.staffName,
    department: employee.department,
    basicSalary: employee.basicSalary,
    allowances: '',
    deductions: '',
    month: '',
    netSalary: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData({
      _id: employee._id || '',
      employeeId: employee.employeeId,
      staffName: employee.staffName,
      department: employee.department,
      basicSalary: employee.basicSalary,
      allowances: employee.allowances || '',
      deductions: employee.deductions || '',
      month: employee.month || '',
      netSalary: employee.netSalary || ''
    });
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateNetSalary = () => {
    const basic = parseFloat(formData.basicSalary) || 0;
    const allowances = parseFloat(formData.allowances) || 0;
    const deductions = parseFloat(formData.deductions) || 0;
    return (basic + allowances - deductions).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const netSalary = calculateNetSalary();
      const payrollData = {
        ...formData,
        netSalary: parseFloat(netSalary),
        allowances: parseFloat(formData.allowances) || 0,
        deductions: parseFloat(formData.deductions) || 0
      };

      if (formData._id) {
        const response = await axios.put(`http://localhost:5000/api/payrolls/${formData._id}`, payrollData);
        onSuccess(response.data);
      } else {
        setError('Payroll ID not found. Cannot update.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update payroll');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full overflow-y-auto px-4 py-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: 'Employee ID', value: formData.employeeId },
          { label: 'Staff Name', value: formData.staffName },
          { label: 'Department', value: formData.department },
          { label: 'Basic Salary', value: formData.basicSalary }
        ].map((field, index) => (
          <div key={index}>
            <label className="block text-sm text-gray-700">{field.label}</label>
            <input
              type="text"
              value={field.value}
              readOnly
              className="mt-1 w-full text-sm bg-gray-100 border border-gray-300 rounded p-1.5"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm text-gray-700">Allowances</label>
          <input
            type="number"
            name="allowances"
            value={formData.allowances}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 w-full text-sm border border-gray-300 rounded p-1.5"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Deductions</label>
          <input
            type="number"
            name="deductions"
            value={formData.deductions}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 w-full text-sm border border-gray-300 rounded p-1.5"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Month</label>
          <input
            type="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
            className="mt-1 w-full text-sm border border-gray-300 rounded p-1.5"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Net Salary</label>
          <input
            type="text"
            value={calculateNetSalary()}
            readOnly
            className="mt-1 w-full text-sm bg-gray-100 border border-gray-300 rounded p-1.5"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      <div className="flex justify-end mt-4 gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default AddPayroll;
