import React from "react";
import AuthForm from "../components/AuthForm";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import schoolImage from "../assets/school-budget-tracker.png";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBar />
      <div 
        className="flex-grow flex items-center justify-center p-4"
        style={{
          backgroundImage: `url(${schoolImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <AuthForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;