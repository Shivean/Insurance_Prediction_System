import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/insure-predict-cropped.png";
import {
  FaEnvelope,
  FaUserShield,
  FaGlobe,
  FaChartLine,
  FaHome,
  FaPhone,
} from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import teamImage from "../images/insuranceaboutus.jpg";

const AboutUs = () => {
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
            to="/contact"
            className="flex items-center gap-2 text-base text-white hover:text-orange-300 px-4 py-2 transition-colors duration-300 ease-in-out"
          >
            <FaEnvelope />
            Contact
          </Link>
        </nav>
      </header>

      {/* About Section */}
      <section className="bg-[#E5F5F8] text-gray-800 px-8 py-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-[BIZ_UDPMincho]">
              Empowering Smarter Insurance Decisions
            </h1>
            <p className="text-lg mb-6 font-[Open_Sans] text-gray-700">
              At <strong>InsurePredict</strong>, we believe in making insurance
              more accessible, transparent, and personalized. Our AI-driven
              system helps users predict their health and car insurance premiums
              with accuracy and ease, empowering them to make smarter financial
              choices.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <FaUserShield className="text-2xl text-[#F28B82]" />
                <p className="text-gray-700 font-[Open_Sans]">
                  Built with privacy and security in mind to protect your data.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <FaChartLine className="text-2xl text-[#F28B82]" />
                <p className="text-gray-700 font-[Open_Sans]">
                  Predictive models trained on real-world data for high
                  accuracy.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <FaGlobe className="text-2xl text-[#F28B82]" />
                <p className="text-gray-700 font-[Open_Sans]">
                  Our mission is to make insurance insights available to
                  everyone.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <img
              src={teamImage}
              alt="Our Team"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-[#3c5b62] text-white px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 font-[BIZ_UDPMincho]">
          Our Vision
        </h2>
        <p className="text-lg max-w-3xl mx-auto font-[Open_Sans]">
          We envision a future where everyone can easily understand their
          insurance premiums, compare plans, and make decisions confidently —
          without jargon, stress, or unexpected costs.
        </p>
      </section>

      {/* Footer (Styled Same as LandingPage) */}
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
              <Link to="/contact" className="hover:underline mb-2">
                Contact Us
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
                <FaPhone className="text-xl" />
                +977 9812345678
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
