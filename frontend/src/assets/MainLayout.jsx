import { React, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaCarCrash,
  FaHistory,
  FaUser,
  FaThLarge,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "./insure-predict-cropped.png";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

const MainLayout = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogoClick = () => {
    navigate("/"); // Redirect to the LandingPage route
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      localStorage.removeItem("token"); // Clear the token from local storage
      navigate("/"); // Redirect to the LandingPage route after logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle logout action if the user confirms
  const confirmLogout = () => {
    handleLogout();
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#37474F] to-[#263238] text-white flex items-center gap-12 px-6 py-4 shadow">
        <img
          src={logo}
          alt="Logo"
          onClick={handleLogoClick}
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
              to="/main"
              active={location.pathname === "/main"}
            />
            <NavItem
              icon={<FaShieldAlt />}
              label="Health Insurance Prediction"
              to="/main/health_prediction"
              active={location.pathname === "/main/health_prediction"}
            />
            <NavItem
              icon={<FaCarCrash />}
              label="Car Insurance Prediction"
              to="/main/car_prediction"
              active={location.pathname === "/main/car_prediction"}
            />
            <NavItem
              icon={<FaHistory />}
              label="Prediction History"
              to="/main/history"
              active={location.pathname === "/main/history"}
            />
            <NavItem
              icon={<FaUser />}
              label="User Details"
              to="/main/profile"
              active={location.pathname === "/main/profile"}
            />
          </nav>
          <div
            onClick={() => setShowModal(true)}
            className="flex items-center gap-4 px-3 py-2 rounded cursor-pointer text-gray-600 hover:bg-rose-500 hover:text-white transition-colors duration-300"
          >
            <FaSignOutAlt />
            <span>Log Out</span>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg bg-opacity-20 flex justify-center items-center backdrop-blur-md">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
                <p className="text-gray-600 mb-4">
                  Do you really want to log out?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400"
                    onClick={() => setShowModal(false)} // Close modal if canceled
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
                    onClick={confirmLogout} // Proceed with logout
                    disabled={loading} // Disable button if loading
                  >
                    {loading ? "Logging out..." : "Log Out"}
                  </button>
                </div>
              </div>
            </div>
          )}
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

export default MainLayout;
