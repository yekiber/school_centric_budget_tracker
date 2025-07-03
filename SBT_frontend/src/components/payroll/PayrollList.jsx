import React from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

const PayrollList = ({ payrolls, onRefresh, onEdit, onDelete }) => {
  const calculateNetSalary = (payroll) => {
    const basic = parseFloat(payroll.basicSalary) || 0;
    const allowances = parseFloat(payroll.allowances) || 0;
    const deduct = parseFloat(payroll.deductions) || 0;
    return (basic + allowances - deduct).toFixed(2);
  };

  const StatusBadge = ({ status }) => {
    const statusMap = {
      pending: { color: "yellow", text: "Pending" },
      approved: { color: "green", text: "Approved" },
      paid: { color: "blue", text: "Paid" },
      rejected: { color: "red", text: "Rejected" },
    };

    const { color, text } = statusMap[status] || {
      color: "gray",
      text: "Unknown",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
      >
        {text}
      </span>
    );
  };

  return (
    <div className="space-y-2">
      {/* Top scroll container */}
      <div className="overflow-x-auto">
        <div className="w-max">
          {/* Optional dummy div to match width and enable scroll */}
        </div>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Basic Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Month
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrolls.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No payroll records found.
                </td>
              </tr>
            ) : (
              payrolls.map((payroll) => (
                <tr key={payroll._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payroll.staffName}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {payroll.employeeId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {parseFloat(payroll.basicSalary).toLocaleString("en-ET")} ETB
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {calculateNetSalary(payroll).toLocaleString("en-ET")} ETB
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(payroll.month).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={payroll.status || "pending"} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() => onEdit(payroll)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(payroll._id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                      {payroll.document && (
                        <button
                          onClick={() => window.open(payroll.document, "_blank")}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                          title="View Document"
                        >
                          <FaEye />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom scroll container */}
      <div className="overflow-x-auto">
        <div className="w-max">
          {/* Optional dummy div to match width and enable scroll */}
        </div>
      </div>
    </div>
  );
};

export default PayrollList;
