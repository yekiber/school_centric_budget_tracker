import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { FaUsers, FaUserGraduate, FaClipboardCheck, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SmallLoading from "../../components/loadings/SmallLoading";

const SystemAdminDashboard = () => {
  const { stats, isFetchingStats } = useContext(StoreContext);
  const { totalEmployee, isFetchingTotalEmployee } = useContext(StoreContext);
  const navigate = useNavigate();

  const statsData = [
    {
      title: "Total Staff",
      count: stats.totalActors,
      icon: <FaUsers className="text-4xl text-blue-700 mb-2" />,
      link: "/system-admin-page/manage-actors"
    },
    {
      title: "Total Students",
      count: stats.totalStudents,
      icon: <FaUserGraduate className="text-4xl text-green-600 mb-2" />,
      link: "/system-admin-page/manage-students"
    },
    {
      title: "Total Registered",
      count: stats.totalRegistered,
      icon: <FaClipboardCheck className="text-4xl text-purple-600 mb-2" />,
    },
  ];

  const totalEmployeesData = [
    {
      title: "Total Employees",
      count: totalEmployee,
      icon: <FaUserTie className="text-3xl text-red-600" />,
    },
  ];

  const handleCardClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(90vh-10px)] bg-gray-100 px-8 py-6 mt-10">
      <section className="flex-1 w-full">
        <h2 className="text-2xl text-center font-semibold mb-6 text-gray-800">
          Users Overview
        </h2>

        {isFetchingStats || isFetchingTotalEmployee ? (
          <SmallLoading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {statsData.map((item, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(item.link)}
                className={`bg-white rounded-xl shadow-md p-6 text-center ${
                  item.link ? "cursor-pointer hover:shadow-lg transition-shadow hover:bg-gray-50" : ""
                }`}
              >
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-medium text-gray-700 mt-3">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold text-indigo-700">
                  {item.count}
                </p>
              </div>
            ))}

            {/* Total Employees card */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="flex justify-center">{totalEmployeesData[0].icon}</div>
              <h3 className="text-lg font-medium text-gray-700 mt-3">
                {totalEmployeesData[0].title}
              </h3>
              <p className="text-2xl font-bold text-indigo-700">
                {totalEmployeesData[0].count}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SystemAdminDashboard;