import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Navigation links for Resource & Finance Head
const financeHeadLinks = [
  {
    path: "/resource-and-finance-head-page/resource-and-finance-head-dashboard",
    label: "Dashboard",
  },
  {
    path: "/resource-and-finance-head-page/resource-and-finance-head-request",
    label: "Request Budget",
  },
];

const ResourceAndFinanceHeadPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 relative">
      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar
          navLinks={financeHeadLinks}
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
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
          {/* TopBar */}
          <div className="fixed w-full z-40 bg-white shadow-md">
            <TopBar />
          </div>

          {/* Page Content - with hidden overflow and forced single-column layout */}
          <main className="pt-16 px-6 flex-1">
            <div className="min-h-[calc(100vh-8rem)] pb-6">
              {/* Hide any existing footer in child components */}
              <div className="footer-hider">
                <Outlet />
                <style jsx>{`
                  .footer-hider footer {
                    display: none !important;
                  }
                `}</style>
              </div>
            </div>
           
          </main>
          <div className="w-full z-40 bg-white shadow-md">
          {" "}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAndFinanceHeadPage;
