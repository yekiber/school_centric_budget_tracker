import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import Footer2 from "../../components/Footer2";
import SideBar from "../../components/SideBar";
import { ChevronRight, ChevronLeft } from "lucide-react";

const generalManagerLinks = [
  {
    path: "/general-manager-page/general-manager-dashboard",
    label: "Dashboard",
  },
  { path: "/general-manager-page/budget-requested", label: "Budget Requested" },
  { 
    path: "/general-manager-page/program-budget-requests", 
    label: "Program Budgets" 
  },
  { path: "/general-manager-page/payment-requested", label: "Payment" },
  { path: "/general-manager-page/messages-page", label: "Messages" },
  { path: "/general-manager-page/veiw-report", label: "View Report" },
  { path: "/general-manager-page/annual-budget", label: "Set Budget" },
];

const GeneralManagerPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex bg-gray-200 min-h-screen">
      {/* Sidebar */}
      <SideBar
        navLinks={generalManagerLinks}
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
          <Footer2 />
        </div>
      </div>
    </div>
  );
};

export default GeneralManagerPage;