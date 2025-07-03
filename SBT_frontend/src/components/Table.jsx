import React from 'react';

const Table = ({ columns, data }) => {
  // Ensure data is an array
  const tableData = Array.isArray(data) ? data : [];

  return (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="px-4 py-2 text-left border-b">{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.length > 0 ? (
          tableData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-2 border-b">{row[column.key]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="px-4 py-2 text-center">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;