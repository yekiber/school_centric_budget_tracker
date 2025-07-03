import React from 'react';
import { assets } from '../assets/assets';
import { FaGraduationCap } from 'react-icons/fa'; // Example education icon

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center shadow-md">
      {/* Logo & Academy Name */}
      <div className="flex items-center gap-3">
        <img className="h-12 w-12 object-contain" src={assets.Logo} alt="Yajeb Academy Logo" />
      </div>

      {/* System Title */}
      <h2 className="text-lg md:text-xl font-medium tracking-wide text-center">
        BUDGET TRACKING SYSTEM
      </h2>

      {/* Education-Related Icon (You can change or add more icons) */}
      <div className="text-white text-3xl md:text-4xl">
        <FaGraduationCap />
      </div>
    </header>
  );
};

export default Header;