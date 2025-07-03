import React, { useState } from "react";

const StudentFormModal = ({ isOpen, handleModalClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    grade: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  const gradeOptions = [
    "KG1",
    "KG2",
    "KG3",
    "Grade1",
    "Grade2",
    "Grade3",
    "Grade4",
    "Grade5",
    "Grade6",
  ];

  return isOpen ? (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 pt-24">
      <div className="bg-white p-4 rounded-md w-[550px] max-h-[95vh] shadow-lg">
        <h3 className="text-xl font-light mb-3 text-center">
          Registeration Form
        </h3>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          {/* 2 Columns for all inputs */}
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="middleName" className="block text-sm font-medium">
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Full-width Grade selection */}
          <div className="col-span-2">
            <label htmlFor="grade" className="block text-sm font-medium">
              Grade
            </label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="" disabled>
                Select Grade
              </option>
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade.replace("Grade", "Grade ")}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-around ">
            <button
              type="button"
              onClick={handleModalClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded hover:opacity-90 transition-opacity shadow-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default StudentFormModal;
