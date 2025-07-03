import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import { ChevronRight, ChevronLeft } from "lucide-react";

const adminLinks = [
  { path: "/system-admin-page/system-admin-dashboard", label: "Dashboard" },
  { path: "/system-admin-page/manage-actors", label: "Manage Staff" },
  { path: "/system-admin-page/manage-students", label: "Manage Students" },
];

const SystemAdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex bg-gray-200 min-h-screen">
      {/* Sidebar */}
      <SideBar
        navLinks={adminLinks}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Toggle Button */}
      <div
        className="fixed top-4 left-4 z-50 cursor-pointer p-2 bg-gray-800 rounded-md text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="fixed w-full z-40 bg-white shadow-md">
          <TopBar />
        </div>
        <main className="pt-16 px-6">
          <Outlet />
        </main>
        <div className="w-full z-40 bg-white shadow-md">
          {" "}
        </div>
      </div>
    </div>
  );
};

export default SystemAdminPage;
