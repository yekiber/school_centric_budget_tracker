import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import MaleAvatar from "../assets/boy avatar.png";
import FemaleAvatar from "../assets/female avatar.png";
import { assets } from "../assets/assets";
import ChangePasswordForm from "./ChangePasswordForm";

const TopBar = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { user, logout, resetPassword } = useContext(StoreContext);
  const avatar = user?.gender === "female" ? FemaleAvatar : MaleAvatar;

  const handleLogout = () => {
    logout();
  };

  const handleResetPassword = async (values) => {
    const result = await resetPassword(
      user.email,
      values.newPassword,
      values.confirmPassword,
      user.role
    );
    if (result.success) {
      setIsChangingPassword(false);
    }
  };

  return (
    <header className="bg-blue-950 text-white h-20 flex items-center px-4 shadow-md w-full">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="h-14 w-auto object-contain"
            src={assets.Logo}
            alt="Logo"
          />
        </Link>
      </div>

      <div className="flex items-center gap-4 flex-grow justify-around">
        <h2 className="text-2xl font-light flex items-center gap-2">
          👋 Welcome, <span className="font-semibold">{user?.firstName}</span>!
        </h2>
        <div className="relative group">
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={avatar}
              alt="User Avatar"
              className="h-10 w-10 rounded-full border-2 border-white object-cover"
            />
            <IoMdArrowDropdown size={20} className="text-white" />
          </div>

          <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 animate-fadeIn">
            <div className="p-4 flex flex-col items-center border-b">
              <img
                src={avatar}
                alt="User"
                className="h-16 w-16 rounded-full border-2 border-blue-500 object-cover"
              />
              <p className="mt-2 font-semibold text-lg">{user?.firstName}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <h2
              className="w-full flex items-center justify-center py-3 text-blue-950 hover:bg-white transition font-semibold gap-2 cursor-pointer"
              onClick={() => setIsChangingPassword(true)}
            >
              Change Password
            </h2>
            <button
              className="w-full flex items-center justify-center py-3 text-red-500 hover:text-red-700 transition font-semibold gap-2"
              onClick={handleLogout}
            >
              <FiLogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Right Section: Spacer */}
      <div className="w-16"></div>

      {/* Conditional Rendering of ChangePasswordForm */}
      {isChangingPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <ChangePasswordForm
              onSubmit={handleResetPassword}
              onCancel={() => setIsChangingPassword(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;
