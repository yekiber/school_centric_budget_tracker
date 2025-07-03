import React, { useState } from "react";
import Modal from "./Modal";

const ActorFormModal = ({isOpen,modalType,newActor,handleInputChange,handleModalClose,handleSubmit}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!newActor.firstName?.trim()) tempErrors.firstName = "First Name is required";
    if (!newActor.lastName?.trim()) tempErrors.lastName = "Last Name is required";
    
    if (!newActor.email?.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(newActor.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (modalType === "create") { 
      if (!newActor.password?.trim()) {
        tempErrors.password = "Password is required";
      } else if (newActor.password.length < 8) {
        tempErrors.password = "Password must be at least 8 characters long";
      }
    }

    if (!newActor.phoneNumber?.trim()) {
      tempErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(newActor.phoneNumber)) {
      tempErrors.phoneNumber = "Invalid phone number (must be 10 digits)";
    }

    if (!newActor.address?.trim()) tempErrors.address = "Address is required";
    if (!newActor.role?.trim()) tempErrors.role = "Role is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit();  // ✅ Calls the parent submit function
    }
  };

  return ( 
    <Modal
      isOpen={isOpen}
      title={modalType === "create" ? "Staff registration form" : "Update Staff"}
      onClose={handleModalClose}
    >
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(newActor)
            .filter((key) => !["_id", "createdAt", "updatedAt", "__v"].includes(key))
            .map((key) => (
              <div key={key}>
                <label className="block text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>

                {key === "role" ? (
                  <select
                    name="role"
                    value={newActor.role}
                    onChange={handleInputChange}
                    className={`border px-3 py-1 rounded w-full ${errors[key] ? "border-red-500" : ""}`}
                  >
                    <option value="">Select Role</option>
                    <option value="System Admin">System Admin</option>
                    <option value="General Manager">General Manager</option>
                    <option value="School Director">School Director</option>
                    <option value="Auditor">Auditor</option>
                    <option value="Resource and Finance">Resource and Finance</option>
                    <option value="Human Resource">Human Resource</option>
                  </select>
                ) : (
                  <input
                    type={key === "password" ? "password" : "text"}
                    name={key}
                    value={newActor[key]}
                    onChange={handleInputChange}
                    className={`border px-3 py-1 rounded w-full ${errors[key] ? "border-red-500" : ""}`}
                  />
                )}

                {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
              </div>
            ))}
        </div>

        {/* ✅ Add Submit & Cancel Buttons */}
        <div className="flex justify-between">
          <button 
            type="button"
            onClick={handleModalClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded hover:opacity-90 transition-opacity shadow-lg"
          >
            {modalType === "create" ? "Register" : "Update"}
          </button>
        </div>
      </form>
    </Modal>
  );  
};

export default ActorFormModal;
