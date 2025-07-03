import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ActorTable = ({ actors = [], columns, handleEditActor, handleDeleteActor }) => {
  if (!Array.isArray(actors)) {
    console.error("Invalid actors data:", actors);
    return <p className="text-red-500">Error: Actors data is invalid.</p>;
  }

  return (
    <table className="min-w-full divide-y divide-gray-300 mt-4">
      <thead className="bg-gray-200">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="px-4 py-3 text-left text-sm font-medium text-gray-900 tracking-wider"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {actors.length > 0 ? (
          actors.map((actor) => (
            <tr key={actor._id}>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-gray-800">
                  {col.key === "actions" ? (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEditActor(actor)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteActor(actor)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  ) : (
                    actor[col.key] || "N/A"
                  )}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center px-4 py-6 text-gray-500">
              No actors found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ActorTable;
