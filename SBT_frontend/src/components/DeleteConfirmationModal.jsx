import React from "react";
import Modal from "./Modal";

const DeleteConfirmationModal = ({
  isOpen,
  actor,
  handleModalClose,
  handleDelete,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      title="Delete"
      onClose={handleModalClose}
      onSubmit={handleDelete}
    >
      <div className="space-y-6">
        <div className="text-center text-md">
          <p>Are you sure you want to delete the actor {actor?.firstName}?</p>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleModalClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            cancel
          </button>

          <button
            type="submit"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
