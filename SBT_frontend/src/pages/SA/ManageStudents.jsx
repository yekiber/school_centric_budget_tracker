import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import StudentTable from "../../components/StudentTable";
import StudentFormModal from "../../components/StudentFormModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create"); // "create" or "edit"
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const query = searchTerm.toLowerCase();
    const results = students.filter((s) =>
      (s.studentId || "").toLowerCase().includes(query) ||
      (s.firstName || "").toLowerCase().includes(query) ||
      (s.middleName || "").toLowerCase().includes(query) ||
      (s.lastName || "").toLowerCase().includes(query) ||
      (s.email || "").toLowerCase().includes(query)
    );
    setFilteredStudents(results);
  }, [searchTerm, students]);
  
  

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/students");
      if (Array.isArray(res.data)) {
        setStudents(res.data);
        setFilteredStudents(res.data); // set initially
      } else {
        toast.error("Invalid response format from server.");
      }
    } catch (error) {
      toast.error("Failed to fetch.");
    }
  };

  const handleAddStudent = () => {
    setModalType("create");
    setCurrentStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setModalType("edit");
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (student) => {
    setCurrentStudent(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteStudent = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/students/${currentStudent._id}`);
      const updatedList = students.filter((s) => s._id !== currentStudent._id);
      setStudents(updatedList);
      setFilteredStudents(updatedList);
      toast.success("Deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = async (newStudent) => {
    if (modalType === "create") {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/students/register", newStudent);
        const updatedList = [...students, res.data];
        setStudents(updatedList);
        setFilteredStudents(updatedList);
        toast.success("Added successfully!");
      } catch (error) {
        console.error("Add Error:", error.response?.data || error.message);
        toast.error(
          error.response
            ? `Error: ${error.response.status} - ${error.response.data.message || "Failed to add student."}`
            : "Failed to connect to server."
        );
      }
    } else if (modalType === "edit") {
      try {
        const res = await axios.put(
          `http://localhost:5000/api/auth/students/${currentStudent._id}`,
          newStudent
        );
        const updatedList = students.map((s) =>
          s._id === currentStudent._id ? res.data : s
        );
        setStudents(updatedList);
        setFilteredStudents(updatedList);
        toast.success("Updated successfully!");
      } catch (error) {
        toast.error("Failed to update.");
      }
    }

    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <h3 className="text-2xl font-light">Manage Students</h3>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Search by ID or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleAddStudent}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Register
          </button>
        </div>
      </div>

      <StudentTable
        students={filteredStudents}
        handleEditStudent={handleEditStudent}
        handleDeleteStudent={handleDeleteStudent}
      />

      <StudentFormModal
        isOpen={isModalOpen}
        modalType={modalType}
        currentStudent={currentStudent}
        handleModalClose={handleModalClose}
        handleSubmit={handleSubmit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        student={currentStudent}
        handleModalClose={handleModalClose}
        handleDelete={confirmDeleteStudent}
      />
    </div>
  );
};

export default ManageStudents;
