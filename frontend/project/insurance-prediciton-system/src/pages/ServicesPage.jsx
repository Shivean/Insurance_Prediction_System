import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaShieldAlt,
  FaCarCrash,
  FaHistory,
  FaUser,
  FaThLarge,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assets/insure-predict-cropped.png";
import { Outlet } from "react-router-dom";

const ServicesPage = () => {
  const location = useLocation();
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#37474F] to-[#263238] text-white flex items-center gap-12 px-6 py-4 shadow">
        <img
          src={logo}
          alt="Logo"
          className="h-13 filter brightness-0 invert cursor-pointer"
        />
        <h1 className="text-xl font-[BIZ_UDPMincho]">
          Insurance Prediction System Services
        </h1>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-[#E5F5F8] p-4 flex flex-col justify-between">
          <nav className="flex flex-col gap-4">
            <NavItem
              icon={<FaThLarge />}
              label="Dashboard"
              to=""
              active={location.pathname.includes("dashboard")}
            />
            <NavItem
              icon={<FaShieldAlt />}
              label="Health Insurance Prediction"
              to="health-prediction"
              active={location.pathname.includes("health-insurance")}
            />
            <NavItem
              icon={<FaCarCrash />}
              label="Car Insurance Prediction"
              to="car-insurance"
              active={location.pathname.includes("car-insurance")}
            />
            <NavItem
              icon={<FaHistory />}
              label="Prediction History"
              to="history"
              active={location.pathname.includes("history")}
            />
            <NavItem
              icon={<FaUser />}
              label="User Details"
              to="profile-page"
              active={location.pathname.includes("profile-page")}
            />
          </nav>
          <div className="flex items-center gap-4 px-3 py-2 rounded cursor-pointer text-gray-600 hover:bg-rose-500 hover:text-white transition-colors duration-300">
            <FaSignOutAlt />
            <span>Log Out</span>
          </div>
        </aside>
        {/* Main content */}
        <main className="main-scroll flex-1 bg-[#CFE8ED] p-6 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, to, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-4 px-3 py-2 rounded cursor-pointer transition-colors duration-300 ease-in-out ${
      active
        ? "bg-[#3490B1] text-white"
        : "hover:bg-[#3EA2C6] text-gray-700 hover:text-white font-light"
    }`}
  >
    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
      {icon}
    </span>
    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
      {label}
    </span>
  </Link>
);

export default ServicesPage;
