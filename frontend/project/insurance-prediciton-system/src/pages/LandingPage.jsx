import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/insure-predict-cropped.png";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaUserPlus,
  FaSignInAlt,
  FaInfoCircle,
  FaHeartbeat,
  FaChartBar,
  FaCarAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import testimonialPerson from "../images/testimonial-person.jpg";
import insurancePerson from "../images/insurance-person.jpeg";
import { useAuth } from "../contexts/AuthContext";

const LandingPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#37474F] to-[#263238] text-white px-16 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-13 filter brightness-0 invert"
            />
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            to="/about"
            className="flex items-center gap-2 text-base text-white hover:text-orange-300 px-4 py-2 transition-colors duration-300 ease-in-out"
          >
            <FaInfoCircle />
            About Us
          </Link>

          {user ? (
            <>
              <Link
                to="/services-page/profile-page"
                className="flex items-center gap-2 text-base text-white hover:text-orange-300 px-4 py-2 transition-colors duration-300 ease-in-out"
              >
                <FaUserCircle />
                {user.firstName || "Profile"}
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-base border border-white px-5 py-2 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300 ease-in-out"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-base border border-white px-5 py-2 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300 ease-in-out"
              >
                <FaSignInAlt />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 text-base bg-[#F28B82] px-5 py-2 rounded-full text-white hover:bg-[#e76d68] transition-colors duration-300 ease-in-out"
              >
                <FaUserPlus />
                Register
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-[#3c5b62] text-white px-16 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <h1 className=" lg:text-7xl font-extrabold mb-4 leading-tight font-[BIZ_UDPMincho]">
              An AI-powered Insurance Prediction System
            </h1>
            <p className="text-gray-300 text-lg mb-6 font-[Open_Sans]">
              Get instant insurance premium estimates by submitting a few simple
              personal and lifestyle details.
            </p>
            <div className="flex gap-4">
              {/* Contact Us Link */}
              <Link
                to="/contact"
                className="flex items-center gap-2 text-base px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 ease-in-out"
              >
                <FaEnvelope />
                Contact Us
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 text-base px-6 py-2 rounded-full bg-[#F28B82] text-white hover:bg-[#e76d68] transition-colors duration-300 ease-in-out"
              >
                <FaUserPlus />
                Register
              </Link>
            </div>
          </div>
          <img
            src={insurancePerson}
            alt="Insurance Person"
            className="shadow-lg h-96 w-auto ml-auto -mr-16"
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#3c5b62] text-white py-16 px-8 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold mb-16 font-[BIZ_UDPMincho] w-auto">
          Predict your Insurance Premiums <br /> using Reliable and Accessible{" "}
          <br />
          Model Training Algorithms
        </h2>

        <div className="flex flex-col md:flex-row md:justify-center md:space-x-12 space-y-12 md:space-y-10">
          {/* Item 1 */}
          <div className="flex flex-col items-center max-w-xs mx-auto font-[Open_Sans]">
            <div className="text-6xl mb-4 text-[#F28B82]">
              <FaHeartbeat />
            </div>
            <h3 className="font-semibold text-2xl mb-2">
              Get Quick and Reliable Health Insurance Premium Prediction
              tailored to your lifestyle
            </h3>
            <p className="text-sm text-gray-300">
              Analyzes lifestyle factors to provide customized premium
              estimates.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center max-w-xs mx-auto font-[Open_Sans]">
            <div className="text-6xl mb-4 text-[#F28B82]">
              <FaChartBar />
            </div>
            <h3 className="font-semibold text-2xl mb-2">
              Comprehensive Dashboard for Tracking Your Insurance History and
              Insights
            </h3>
            <p className="text-sm text-gray-300">
              Track your predictions and make informed decisions.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center max-w-xs mx-auto font-[Open_Sans]">
            <div className="text-6xl mb-4 text-[#F28B82]">
              <FaCarAlt />
            </div>
            <h3 className="font-semibold text-2xl mb-2">
              Receive Car Insurance Premium Predictions customized to your Car
              and Driving Experience
            </h3>
            <p className="text-sm text-gray-300">
              Uses car details to generate quick premium estimates.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-[#E5F5F8] py-32 px-8 text-center text-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 font-[BIZ_UDPMincho]">
          More Than 5000 Users Delighted by Our System
        </h2>
        <blockquote className="italic text max-w-3xl mx-auto mb-8 font-[Open_Sans]">
          “Being able to understand the choices I have regarding my insurances
          through this system has improved my choices and savings.”
        </blockquote>
        <img
          src={testimonialPerson}
          alt="John Doe"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <p className="font-bold font-[Open_Sans]">John Doe</p>
        <p className="text-sm text-gray-600 font-[Open_Sans]">
          Chief Technical Officer, TechLord
        </p>
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
              <h4 className="font-semibold mb-4">Helpful Links</h4>
              <Link to="/about" className="hover:underline mb-3">
                About Us
              </Link>
              <Link to="/contact" className="hover:underline mb-3">
                Contact Us
              </Link>
              <a
                href="../assets/InsurePredict_Terms_And_Conditions.pdf"
                download
                className="hover:underline mb-3"
              >
                Terms and Conditions
              </a>
            </div>

            {/* Social Media */}
            <div className="flex flex-col gap-4 font-[Open_Sans]">
              <h4 className="font-semibold mb-4">Social Media</h4>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <FaFacebook className="text-xl" />
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <FaInstagram className="text-xl" />
                Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <FaTwitter className="text-xl" />
                Twitter
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
