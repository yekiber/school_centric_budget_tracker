import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";
import Footer from "../components/Footer";
import { assets, features } from "../assets/assets";
import NavBar from "../components/NavBar";
import {
  FaEnvelope,
  FaFacebook,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";

const Home = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("http://localhost:5000/api/contact-messages/send", {
          recipientType: "specific_actor",
          recipientDetail: "systemadmin@gmail.com",
          userName: values.name,
          userEmail: values.email,
          userMessage: values.message,
        });

        setContactModalOpen(false);
        toast.success("Message sent successfully!");
        resetForm();
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send the message.");
      }
    },
  });

  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar />

      {/* Header Section */}
      <div id="home" className="bg-blue-950 text-white py-20 px-8 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient typewriter">
              Welcome to Yajeb Academy Budget Tracker
            </h1>
            {/* Floating Animated p */}
            <p className="text-lg md:text-xl mt-4 text-blue-200 hover:text-purple-300 transition-all duration-300 hover:scale-105 cursor-pointer animate-float">
              Empowering Education, One Budget at a Time. Take control of your school's finances and focus on what truly matters—shaping the future of your students.
            </p>
          </div>
          <div className="flex justify-center">
  <div className="overflow-hidden rounded-md shadow-lg">
    <img 
      src={assets.image_png} 
      alt="Students engaged in learning" 
      className="object-cover h-72 w-72 md:h-96 md:w-96 lg:h-104 lg:w-104 transition-transform duration-300 hover:scale-105" 
    />
  </div>
</div>
        </div>
      </div>

      {/* Features Section */}
      <div id="services" className="bg-gray-100 py-20 px-6">
        <Title title="Services" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-105 group"
            >
              {/* Icon */}
              <div className="relative h-20 w-20 mx-auto mb-4">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Title with Gradient Text on Hover */}
              <h2 className="text-xl font-semibold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {feature.title}
              </h2>

              {/* Description with Fade-In Effect */}
              <p className="text-gray-600 mt-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section - Widened */}
      <div id="contact" className="bg-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <Title title="Contact Us" />
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Message</label>
              <textarea
                name="message"
                onChange={formik.handleChange}
                value={formik.values.message}
                onBlur={formik.handleBlur}
                className="w-full text-black border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="6"
                placeholder="Your message here..."
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.message}</p>
              )}
            </div>
            <button
  type="submit"
  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-medium shadow-md hover:shadow-lg"
>
  Send Message
</button>
          </form>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-white py-20 px-6">
        <Title title="About Us" />
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
            At Yajeb Academy, we are committed to fostering academic excellence
            while ensuring efficient financial management. Our innovative
            **Budget Tracker** simplifies resource allocation, allowing
            institutions to focus on delivering quality education.
          </p>

          <h3 className="text-blue-500 text-xl font-semibold mt-6">Our Mission</h3>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
            To empower educational institutions with cutting-edge financial
            solutions, enhancing transparency, accountability, and efficiency in
            budget management.
          </p>

          <h3 className="text-blue-500 text-xl font-semibold mt-6">Our Vision</h3>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
            To be a leader in financial technology for education, ensuring that
            schools and academies operate smoothly with seamless financial
            planning and monitoring tools.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <h3 className="text-blue-500 text-xl font-semibold mb-4">Get in Touch</h3>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 text-gray-700">
            {/* Email */}
            <a
              href="mailto:zeki.mama21.21@gmail.com"
              className="flex items-center space-x-2 hover:text-blue-600"
            >
              <FaEnvelope className="text-xl" />
              <span>Email Us</span>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/+90QGUxMxz4Q3YWE0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-600"
            >
              <FaTelegram className="text-xl" />
              <span>Telegram</span>
            </a>

            {/* Facebook */}
            <a
              href="https://web.facebook.com/zekimes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-600"
            >
              <FaFacebook className="text-xl" />
              <span>Facebook</span>
            </a>

            {/* Twitter (X) */}
            <a
              href="https://twitter.com/Zekiman1234"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-600"
            >
              <FaXTwitter className="text-xl" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;