import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import { ChevronRight, ChevronLeft } from "lucide-react";

const SMHeadLinks = [
  { path: "/school-director-page/school-director-dashboard", label: "Dashboard" },
  { path: "/school-director-page/school-director-request", label: "Request Budget" },
];

const SchoolDirectorPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex bg-gray-200 min-h-screen">
      {/* Sidebar */}
      <SideBar
        navLinks={SMHeadLinks}
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

export default SchoolDirectorPage;