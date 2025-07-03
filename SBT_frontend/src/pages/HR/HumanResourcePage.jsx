import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import Footer2 from "../../components/Footer2";
import SideBar from "../../components/SideBar";
// import Footer2 from "../../components/Footer2.jsx";
import { ChevronRight, ChevronLeft } from "lucide-react";

const HRheadLinks = [
  { path: "/human-resource-page/human-resource-dashboard", label: "Dashboard" },
  { path: "/human-resource-page/human-resource-request", label: "Request Budget" },
  { path: "/human-resource-page/prepare-payroll", label: "Prepare Payroll" },
  { path: "/human-resource-page/program-budget", label: "Program Budget" }, // Added this line
];

const HumanResourcePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 relative">
      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar
          navLinks={HRheadLinks}
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
          <Footer2 />
        </div>
        </div>
      </div>
    </div>
  );
};

export default HumanResourcePage;