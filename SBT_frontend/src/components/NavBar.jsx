import React from "react";
import { FaCarSide } from "react-icons/fa";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const NavBar = ({ setContactModalOpen }) => {
  return (
    <nav className="bg-blue-950 flex justify-between items-center text-white fixed left-0 top-0 right-0 py-1 px-6 shadow-md z-50">
      <div className="flex items-center gap-3 cursor-pointer">
        <Link to={"/"}>
          <img
            src={assets.Logo}
            alt="Yajeb Academy Logo"
            className="h-20 w-20 object-contain"
          />
        </Link>
      </div>

      <ul className="hidden md:flex gap-10 text-lg font-semibold">
        <Link to={"/"}>
          <li className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">Home</li>
        </Link>
        <a href="#about">
          <li className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">About Us</li>
        </a> 
        <a href="#contact">
          <li className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">Contact Us</li>
        </a>
       
        <a href="#services">
          <li className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">Services</li>
        </a>
      </ul>

      <Link to="/login">
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded-full shadow-md hover:from-blue-500 hover:to-purple-600 transition">
          <FaCarSide />
          Sign In
        </button>
      </Link>
    </nav>
  );
};

export default NavBar;