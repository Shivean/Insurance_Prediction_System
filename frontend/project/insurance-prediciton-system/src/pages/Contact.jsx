import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/insure-predict-cropped.png";
import {
  FaEnvelope,
  FaHome,
  FaPhoneAlt,
  FaUser,
  FaRegCommentDots,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#37474F] to-[#263238] text-white px-16 py-5 flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-12 filter brightness-0 invert"
          />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-base text-white hover:text-orange-300 px-4 py-2 transition-colors duration-300 ease-in-out"
          >
            <FaHome />
            Home
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-2 text-base text-white hover:text-orange-300 px-4 py-2 transition-colors duration-300 ease-in-out"
          >
            <FaEnvelope />
            About
          </Link>
        </nav>
      </header>

      {/* Contact Section */}
      <section className="bg-[#E5F5F8] px-8 py-20 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 font-[BIZ_UDPMincho] text-gray-800">
            Get in Touch
          </h1>

          <form className="bg-white shadow-lg rounded-lg p-8 space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-[Open_Sans] flex items-center gap-2">
                <FaUser />
                Name
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#F28B82]"
                placeholder="Your Full Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-[Open_Sans] flex items-center gap-2">
                <FaEnvelope />
                Email
              </label>
              <input
                type="email"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#F28B82]"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-[Open_Sans] flex items-center gap-2">
                <FaRegCommentDots />
                Message
              </label>
              <textarea
                rows="5"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#F28B82]"
                placeholder="Type your message here..."
              />
            </div>

            <button
              type="submit"
              className="bg-[#F28B82] text-white px-6 py-3 rounded-full hover:bg-[#e76d68] transition-colors duration-300 ease-in-out"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-[#E5F5F8]">
        <footer className="bg-[#E5F5F8] text-gray-800 p-16 border border-black mx-4 my-8">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* Contact Info + Logo */}
            <div className="flex flex-col gap-4 font-[Open_Sans]">
              <img src={logo} alt="Logo" className="w-sm h-auto mb-2 invert" />
              <p>Email: support@insurepredict.com</p>
              <p>Phone: 01 393804, +977 9812345678</p>
            </div>

            {/* Helpful Links */}
            <div className="flex flex-col gap-2 font-[Open_Sans]">
              <h4 className="font-semibold mb-4">Explore</h4>
              <Link to="/" className="hover:underline mb-2">
                Home
              </Link>
              <Link to="/register" className="hover:underline mb-2">
                Register
              </Link>
              <Link to="/about" className="hover:underline mb-2">
                About Us
              </Link>
            </div>

            {/* Contact Info Again */}
            <div className="flex flex-col gap-4 font-[Open_Sans]">
              <h4 className="font-semibold mb-4">Need Help?</h4>
              <Link
                to="/contact"
                className="flex items-center gap-2 hover:underline"
              >
                <FaEnvelope className="text-xl" />
                support@insurepredict.com
              </Link>
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-xl" />
                +977 9812345678
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
