import { useEffect, useState } from "react";
import axios from "axios";

const ParentProfile = () => {
  const [parentData, setParentData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((response) => setParentData(response.data))
      .catch((err) => setError(err.message))
      .catch((error) => console.log("parent fetch error", error))
      .finally(() => setLoading(false));
  },[]);

  if (loading)
    return <p className="text-3xl text-gray-500">Loading please wait...</p>;
  if (error) return <p className="text-3xl text-red-400">error {error}</p>;

  console.log(parentData);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-200">
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {parentData.firstName.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {parentData.firstName}{parentData.middleName}{parentData.lastName}
            </h2>
            <p className="text-gray-600 mt-1 text-sm">{parentData.email}</p>
          </div>
        </div>
        <button className="mt-4 sm:mt-0 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md">
          Edit Profile
        </button>
      </div>

      {/* Personal Info & Budget Grid */}
      <div className="mt-8 flex">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mt-20 mb-3">
            Personal Information
          </h3>
          <dl className="space-y-3">
            <div className="flex items-center space-x-2">
              <dt className="font-medium text-gray-700">Phone:</dt>
              <dd className="text-gray-600">{parentData.phoneNumber}</dd>
            </div>
            <div className="flex items-center space-x-2">
              <dt className="font-medium text-gray-700">Address:</dt>
              <dd className="text-gray-600">{parentData.address}</dd>
            </div>
            <div className="flex items-center space-x-2">
              <dt className="font-medium text-gray-700">Role:</dt>
              <dd className="text-gray-600">{parentData.role}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Student & Account Details */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Childrens</h3>
        <dl className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="space-y-4">
              {parentData.children.map((child) => (
                <div
                  key={child.id}
                  className={`flex justify-between items-center p-4 rounded-lg ${
                    child.paid ? "bg-gray-200" : "bg-green-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium text-gray-800">{child.name}</p>
                      <p className="text-sm text-gray-600">
                        Due: {child.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      ETB {child.amountDue.toFixed(2)}
                    </p>
                    {child.paid && (
                      <p className="text-sm text-gray-500">Paid</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
         
        </dl>
      </div>
    </div>
  );
};

export default ParentProfile;
