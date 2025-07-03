import {} from "react-icons/fa"
const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 min-h-screen flex justify-center items-center z-50">
      <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm  max-w-4xl relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-2xl font-bold"
          >
            x
          </button>
        </div>

        {/* Modal Content (e.g., Formik Form) */}
        <div className="mt-6 max-h-[75vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
