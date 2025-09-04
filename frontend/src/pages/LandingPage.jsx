import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import logo from "../assets/insure-predict-cropped.png";
import TermsPDF from "../assets/Insurance_Terms_and_Conditions.pdf";
import {
  FaFacebook,
  FaInstagram,
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
import { FaXTwitter } from "react-icons/fa6";
import testimonialPerson from "../assets/testimonial-person.jpg";
import insurancePerson from "../assets/insurance-person.jpeg";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

const LandingPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      localStorage.removeItem("token"); // Clear the token from local storage
      navigate("/"); // Redirect to the LandingPage route after logout
      window.location.reload(); // reset the page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const confirmLogout = () => {
    handleLogout(); // Call the provided handleLogout function to log out
    //setShowModal(false); // Close the modal after logout
  };
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#37474F] to-[#263238] text-white px-16 py-5 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-13" />
        </div>
        <nav className="flex items-center gap-6">
          <Link
            to="/about"
            className="flex items-center gap-2 text-white hover:text-gray-300 px-4 py-2 transition-colors duration-300 ease-in-out"
          >
            <FaInfoCircle />
            About Us
          </Link>

          {user ? (
            <>
              <Link
                to="/main"
                className="flex items-center gap-2 text-base text-white hover:text-gray-300 px-4 py-2 transition-colors duration-300 ease-in-out"
              >
                <FaUserCircle />
                {user.first_name || "Profile"}
              </Link>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 text-base border border-white px-5 py-2 rounded-full text-white hover:border-gray-300 hover:text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer"
              >
                <FaSignOutAlt />
                Logout
              </button>

              <ThemeToggle />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-base border border-white px-5 py-2 rounded-md text-white hover:border-gray-300 hover:text-gray-300 transition-colors duration-300 ease-in-out"
              >
                <FaSignInAlt />
                Login
              </Link>

              <Link
                to="/register"
                className="btn-primary flex items-center gap-2"
              >
                <FaUserPlus />
                Register
              </Link>

              <ThemeToggle />
            </>
          )}
        </nav>

        {showModal && (
          <div className="fixed inset-0 bg bg-opacity-20 flex justify-center items-center backdrop-blur-md">
            <div className="modal-bg border border-gray-200 p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg text-gray-800 font-semibold mb-4">
                Are you sure?
              </h3>
              <p className="text-gray-600 mb-4">
                Do you really want to log out?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="btn-secondary"
                  onClick={() => setShowModal(false)} // Close modal if canceled
                >
                  Cancel
                </button>
                <button
                  className="btn-danger"
                  onClick={confirmLogout} // Proceed with logout
                  disabled={loading} // Disable button if loading
                >
                  {loading ? "Logging out..." : "Log Out"}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="landing-page-bg text-white px-16 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className=" flex flex-col md:flex-row items-start justify-between  gap-10 w-full">

          <div className="max-w-2xl">
            <h1 className="lg:text-7xl md:text-5xl sm:text-3xl lg:text-left md:text-center sm:text-center font-extrabold mb-4 leading-tight font-[BIZ_UDPMincho]">
              An AI-powered Insurance Prediction System
            </h1>
            <p className="text-gray-300 text-lg mb-6 lg:text-left md:text-center sm:text-center">
              Get instant insurance premium estimates by submitting a few simple
              personal and lifestyle details.
            </p>
            <div className="flex gap-4">
              {/* Contact Us Link */}

              <button
                // to="/contact"
                // onClick={handleClick}
                data-tooltip-id="my-tooltip-1"
                className="btn-secondary flex items-center gap-2 sm:text-sm md:text-sm lg:text-base"
              >
                <FaEnvelope />
                Contact Us
              </button>
              <ReactTooltip
                id="my-tooltip-1"
                place="top"
                content="We are busy. Don't try to contact us."
              />

              {user ? (
                <></>
              ) : (
                <>
                  <div>
                    <button
                      to="/register"
                      onClick={() => navigate("/register")}
                      className="btn-primary flex items-center gap-2 sm:text-sm md:text-sm lg:text-base"
                    >
                      {/* <FaUserPlus /> */}
                      Get Started
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>

          <img
            src={insurancePerson}
            alt="Insurance Person"
            className="shadow-lg w-xl h-auto rounded-xl"
          />

        </div>
      </section>

      {/* Features */}
      <section className="prediction-form-bg text-white py-16 px-8 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold mb-16 font-[BIZ_UDPMincho] w-auto">
          Estimate Your Insurance Premiums <br /> with Accessible, Data-Driven Modeling{" "}
          <br />
          — Powered by Machine Learning
        </h2>

        <div className="flex flex-col md:flex-row md:justify-center md:space-x-12 space-y-12 md:space-y-10">
          {/* Item 1 */}
          <div className="flex flex-col items-center max-w-xs mx-auto font-[Open_Sans]">
            <div className="text-6xl mb-4 text-[#F28B82]">
              <FaHeartbeat />
            </div>
            <h3 className="font-semibold text-2xl mb-2">
              Get Quick Health Insurance Premium Prediction
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
              Comprehensive Dashboard for Tracking Your Insurance History
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
              Uses car and driver details to generate quick premium estimates.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-[#E5F5F8] py-32 px-8 text-center text-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 font-[BIZ_UDPMincho]">
          Empowering users through thoughtful technology
        </h2>
        <blockquote className="italic text max-w-3xl mx-auto mb-8 font-[Open_Sans]">
          “Being able to understand the choices I have regarding my insurances
          through this system has improved my choices and savings.”
        </blockquote>
        <img
          src={testimonialPerson}
          alt="testimonial person"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />

        <p className="text-lg font-semibold">Sugam Pokharel</p>
        <p className="text-sm text-gray-500">sugam@pokhrel.com</p>
        <p className="text-sm text-gray-600">9876543210</p>
      </section>

      {/* Footer */}
      <div className="bg-[#E5F5F8]">
        <footer className="bg-[#E5F5F8] text-gray-800 p-16 border rounded-lg mx-4 my-8">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* Contact Info + Logo */}
            <div className="flex flex-col gap-4 font-[Open_Sans]">
              <img
                src={logo}
                alt="Logo"
                className="w-sm h-auto mb-2 logo-img"
              />
              <p>Email: support@insurepredict.com</p>
              <p>Phone: 01 393804, +977 9812345678</p>
            </div>

            {/* Helpful Links */}
            <div className="flex flex-col gap-2 font-[Open_Sans]">
              <h4 className="font-semibold mb-4">Helpful Links</h4>
              <Link to="/about" className="hover:underline mb-3">
                About Us
              </Link>
              <Link to="#" className="hover:underline mb-3">
                Contact Us
              </Link>
              <a
                // href="/frontend/src/assets/Insurance_Terms_and_Conditions.pdf"
                href={TermsPDF}
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
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <FaXTwitter className="text-xl" />X
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
