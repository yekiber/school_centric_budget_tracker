import React, { useState, useEffect } from "react";
import axios from "../../axiosHeaderRequestConfig.js";
import ActorTable from "../../components/ActorTable";
import ActorFormModal from "../../components/ActorFormModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { toast } from "react-toastify";
import {FaEdit, FaPlusCircle} from "react-icons/fa"
const ManageActors = () => {
  const [actors, setActors] = useState([]);
  const [filteredActors, setFilteredActors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentActor, setCurrentActor] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const [newActor, setNewActor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    role: "",
  });

  const columns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "address", label: "Address" },
    { key: "role", label: "Role" },
    {
      key: "actions",
      label: "Actions",
      render: (actor) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditActor(actor)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          >
            <FaEdit size={18}/>
          </button>
          <button
            onClick={() => handleDeleteActor(actor)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            <FaTrash size={25}/>
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/actors");
        const actorList = Array.isArray(response.data) ? response.data : [];
        setActors(actorList);
        setFilteredActors(actorList);
      } catch (error) {
        console.error("Error fetching actors:", error);
        toast.error("Can't fetch data.");
      }
    };

    fetchActors();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = actors.filter((actor) =>
      actor.firstName?.toLowerCase().includes(term) ||
      actor.lastName?.toLowerCase().includes(term) ||
      actor.email?.toLowerCase().includes(term) ||
      actor.role?.toLowerCase().includes(term)
    );
    setFilteredActors(filtered);
  }, [searchTerm, actors]);
  

  const handleEditActor = (actor) => {
    setModalType("update");
    setCurrentActor(actor);
    setNewActor({ ...actor, password: "" });
    setIsModalOpen(true);
  };

  const handleDeleteActor = (actor) => {
    setModalType("delete");
    setCurrentActor(actor);
    setIsModalOpen(true);
  };

  const validateInputs = () => {
    const errors = {};
    if (!newActor.firstName.trim()) errors.firstName = "First name is required.";
    if (!newActor.lastName.trim()) errors.lastName = "Last name is required.";
    if (!newActor.email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(newActor.email)) errors.email = "Invalid email.";
    if (!newActor.phoneNumber.trim()) errors.phoneNumber = "Phone number is required.";
    if (!newActor.address.trim()) errors.address = "Address is required.";
    if (!newActor.role.trim()) errors.role = "Role is required.";
    if (modalType === "create" && (!newActor.password || newActor.password.length < 8)) {
      errors.password = "Password must be at least 8 characters.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setNewActor((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    if (!validateInputs()) return;

    if (modalType === "create") {
      axios
        .post("http://localhost:5000/api/auth/actors/register", newActor)
        .then((response) => {
          const newList = [...actors, response.data];
          setActors(newList);
          setIsModalOpen(false);
          toast.success("Added successfully!");
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Failed to create actor.");
        });
    } else if (modalType === "update") {
      const { _id, createdAt, updatedAt, ...data } = newActor;
      axios
        .put(`http://localhost:5000/api/auth/actors/${currentActor._id}`, data)
        .then((res) => {
          const updated = res.data.actor;
          setActors((prev) =>
            prev.map((actor) => (actor._id === currentActor._id ? updated : actor))
          );
          setIsModalOpen(false);
          toast.success("Staff Updated!");
        })
        .catch(() => toast.error("Failed to update!"));
    }
  };

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-3xl font-light">Manage Staff</h3>
        <div className="flex gap-4 items-center w-full md:w-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email or role..."
            className="w-full md:w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => {
              setModalType("create");
              setNewActor({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                phoneNumber: "",
                address: "",
                role: "",
              });
              setValidationErrors({});
              setIsModalOpen(true);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            <FaPlusCircle size={18}/>
          </button>
        </div>
      </div>

      <ActorTable
        actors={filteredActors}
        columns={columns}
        handleEditActor={handleEditActor}
        handleDeleteActor={handleDeleteActor}
      />

      <ActorFormModal
        isOpen={isModalOpen && modalType !== "delete"}
        modalType={modalType}
        newActor={newActor}
        handleInputChange={handleInputChange}
        handleModalClose={() => setIsModalOpen(false)}
        handleSubmit={handleSubmit}
        validationErrors={validationErrors}
      />

      <DeleteConfirmationModal
        isOpen={isModalOpen && modalType === "delete"}
        actor={currentActor}
        handleModalClose={() => setIsModalOpen(false)}
        handleDelete={() => {
          axios
            .delete(`http://localhost:5000/api/auth/actors/${currentActor._id}`)
            .then(() => {
              setActors((prev) => prev.filter((a) => a._id !== currentActor._id));
              setIsModalOpen(false);
              toast.success("Deleted successfully!");
            })
            .catch((error) => {
              console.error("Delete error:", error);
              toast.error("Failed to delete.");
            });
        }}
      />
    </div>
  );
};

export default ManageActors;
