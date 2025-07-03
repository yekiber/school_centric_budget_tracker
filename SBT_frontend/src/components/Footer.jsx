import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-6 px-6 flex flex-col md:flex-row justify-between items-start shadow-md">
      {/* Budget Tracker Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Budget Tracker</h3>
        <nav className="flex flex-col gap-2">
          <span className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">
            Track Expenses
          </span>
          <span className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">
            Set Budget
          </span>
          <span className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">
            View Reports
          </span>
        </nav>
      </div>

      {/* Services Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Services</h3>
        <nav className="flex flex-col gap-2">
          <span className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">
            Overview
          </span>
          <span className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">
            Financial Advice
          </span>
          <span className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">
            Investment Plans
          </span>
        </nav>
      </div>

      {/* Contact Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Contact</h3>
        <div className="flex flex-col items-start">
          <p className="text-sm">Location: Anbasador sefer, Sibu Sire, Welega</p>
          <p className="text-sm">Phone: +251 911 92-36-42</p>
        </div>
        <nav className="flex flex-col gap-2 mt-2">
          <Link to="/" className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">
            About Us
          </Link>
          <span className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">
            Privacy Policy
          </span>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
