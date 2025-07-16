import { React, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaCarCrash,
  FaHistory,
  FaUser,
  FaThLarge,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
} from "react-icons/fa";
import logo from "./insure-predict-cropped.png";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

const MainLayout = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [showNavLabels, setShowNavLabels] = useState(true);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleSidebar = () => {
    if (sidebarVisible) {
      setShowNavLabels(false); // Instantly hide labels before collapsing
      setSidebarVisible(false);
    } else {
      setSidebarVisible(true);
      // Delay label show to match sidebar animation
      setTimeout(() => {
        setShowNavLabels(true);
      }, 200);
    }
  };

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
    <div className="h-screen flex flex-col ">
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
        <aside
          className={`relative bg-[#E5F5F8] p-4 flex flex-col justify-between transition-all duration-300 ${
            sidebarVisible ? "w-72" : "w-20 items-center"
          }`}
        >
          <nav className="flex flex-col gap-4">
            <NavItem 
              icon={<FaHome/>}
              label="Home"
              to="/"
              visible={showNavLabels}
            />
            <NavItem
              icon={<FaThLarge />}
              label="Dashboard"
              to="/main"
              active={location.pathname === "/main"}
              visible={showNavLabels}
            />
            <NavItem
              icon={<FaShieldAlt />}
              label="Health Insurance Prediction"
              to="/main/health_prediction"
              active={location.pathname === "/main/health_prediction"}
              visible={showNavLabels}
            />
            <NavItem
              icon={<FaCarCrash />}
              label="Car Insurance Prediction"
              to="/main/car_prediction"
              active={location.pathname === "/main/car_prediction"}
              visible={showNavLabels}
            />
            <NavItem
              icon={<FaHistory />}
              label="Prediction History"
              to="/main/history"
              active={location.pathname === "/main/history"}
              visible={showNavLabels}
            />
            <NavItem
              icon={<FaUser />}
              label="User Details"
              to="/main/profile"
              active={location.pathname === "/main/profile"}
              visible={showNavLabels}
            />
            <NavItem
              icon={
                sidebarVisible ? (
                  <FaChevronLeft className="text-gray-400" />
                ) : (
                  <FaChevronRight className="text-gray-400" />
                )
              }
              label=""
              to="#"
              active={false}
              // onClick={() => setSidebarVisible(!sidebarVisible)}
              isToggle
              onClick={toggleSidebar}
            />
          </nav>

          <div
            onClick={() => setShowModal(true)}
            className="flex items-center gap-4 px-3 py-2 rounded cursor-pointer text-gray-600 hover:bg-rose-500 hover:text-white transition-colors duration-300"
            visible={sidebarVisible}
          >
            <span>
              <FaSignOutAlt />
            </span>
            {sidebarVisible && <span>Log Out</span>}
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
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
                    onClick={confirmLogout}
                    disabled={loading}
                  >
                    {loading ? "Logging out..." : "Log Out"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main content (Always visible, adjusts width based on sidebar) */}
        <main className="main-scroll flex-1 bg-[#CFE8ED] p-6  overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, to, active, visible, onClick }) => {
  const className = `flex items-center ${
    visible ? "gap-4 justify-start" : "justify-center"
  } px-3 py-2 rounded cursor-pointer transition-colors duration-300 ease-in-out ${
    active
      ? "bg-[#3490B1] text-white"
      : "hover:bg-[#3EA2C6] text-gray-700 hover:text-white font-light"
  }`;

  // If onClick is provided and to is '#', render a <div> as a button
  if (onClick || to === "#") {
    return (
      <div
        onClick={onClick}
        title={!visible ? label : ""}
        className={`absolute top-1/2 transform -translate-y-1/2 text-gray-700 p-2 rounded-full w-9 z-20 cursor-pointer 
    hover:bg-white transition-all duration-300 flex items-center justify-center
    ${visible ? "right-0" : "-right-4"}
  `}
        style={{ boxShadow: "0 2px 8px rgba(30, 31, 30, 0.26)" }}
      >
        <span className="text-xl">{icon}</span>
      </div>
    );
  }

  return (
    <Link to={to} className={className} title={!visible ? label : ""}>
      <span className="text-xl">{icon}</span>
      {visible && <span>{label}</span>}
    </Link>
  );
};

export default MainLayout;
