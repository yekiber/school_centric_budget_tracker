import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { iconMapping, DefaultIconImage } from "../utils/icons";

const SideBar = ({ navLinks, isSidebarOpen }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-blue-950 text-white flex flex-col justify-between shadow-lg transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 mt-20 px-2">
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 py-2 px-3 rounded-md transition duration-200 ${
                isActive ? "bg-gray-700" : "hover:bg-blue-400"
              }`
            }
          >
            <img
              src={iconMapping[label] || DefaultIconImage}
              alt={`${label} Icon`}
              className="w-6 h-6 text-white"
            />
            <span
              className={`whitespace-nowrap transition-all duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
              }`}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      {/* <div className="p-4">
        <hr className="border-gray-400 mb-4" />
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex items-center gap-4 py-2 px-3 rounded-md bg-red-600 hover:bg-red-700 w-full"
        >
          <LogOut
            className={`text-white ${
              isSidebarOpen ? "w-6 h-6" : "w-7 h-7 ml-[2px]"
            }`}
          />
          <span
            className={`transition-all duration-300 ${
              isSidebarOpen ? "opacity-100 w-6 h-6" : "opacity-0 w-0"
            }`}
          >
            Logout
          </span>
        </button>
      </div> */}
    </div>
  );
};

export default SideBar;