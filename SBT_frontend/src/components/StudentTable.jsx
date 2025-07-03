import React from "react";
import { FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
const StudentTable = ({ students, handleEditStudent, handleDeleteStudent }) => {
  const columns = [
    { key: "studentId", label: "Student ID" },
    { key: "firstName", label: "First Name" },
    { key: "middleName", label: "Middle Name" },
    { key: "lastName", label: "Last Name" },
    { key: "grade", label: "Grade" },
    { key: "phoneNumber", label: "Phone Number" },
    {
      key: "actions",
      label: "Actions",
      render: (student) => (
        <div className="flex space-x-4">
          <Link
            to={`/system-admin-page/manage-students-detail/${student._id}`}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaInfoCircle size={18} />
          </Link>
          <button
            onClick={() => handleDeleteStudent(student)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <table className="min-w-full divide-y divide-gray-300 mt-4">
      <thead className="bg-gray-200">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="px-4 py-3 text-left text-md font-medium text-gray-900 tracking-wider"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {students.length > 0 ? (
        students.map((student, index) => (
          <tr key={student._id || student.studentId || index}>
            {columns.map((column) => (
              <td key={column.key} className="px-4 py-3 text-sm text-gray-800">
                {column.render ? column.render(student) : student[column.key]}
              </td>
            ))}
          </tr>
        ))): (
          <tr>
            <td colSpan={columns.length} className="text-center px-4 py-6 text-gray-500">
              No Students found.
            </td>
          </tr>
        )
        }
      </tbody>
    </table>
  );
};

export default StudentTable;
