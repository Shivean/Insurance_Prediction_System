import React from "react";
import {
  FaCalendarAlt,
  FaPhoneAlt,
  FaLock,
  FaEdit,
  FaEnvelope,
} from "react-icons/fa";

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start gap-8 p-12">
      {/* Left Profile Card */}
      <div className="bg-[#37474F] text-white p-12 rounded-2xl shadow-lg w-full md:max-w-sm flex flex-col items-center text-center font-[Open_Sans]">
        <div className="bg-gray-300 text-gray-700 w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4">
          👤
        </div>
        <h2 className="text-xl font-semibold">Swarup Lamsal</h2>
        <p className="text-sm text-gray-300">swaruplamsal@gmail.com</p>
        <div className="mt-6 text-sm text-gray-300 flex flex-col gap-3 items-start w-full px-4">
          <p className="flex items-center gap-2">
            <FaCalendarAlt /> Member since December 1, 2000
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt /> +977 9812345678
          </p>
        </div>
      </div>

      {/* Right Side Sections */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Personal Info Section */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <button className="text-gray-600 hover:text-black">
              <FaEdit /> Edit
            </button>
          </div>
          <hr className="mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                value="Swarup"
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                value="Lamsal"
                className="border rounded px-4 py-2 w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <div className="flex items-center border rounded pl-3 pr-4 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                value="swaruplamsal@gmail.com"
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <div className="flex items-center border rounded pl-3 pr-4 py-2">
              <FaPhoneAlt className="text-gray-400 mr-2" />
              <input
                type="tel"
                value="+977 9812345678"
                className="w-full outline-none"
              />
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Change Password</h3>
          <hr className="mb-4" />
          <div className="mb-4">
            <label className="block text-sm font-medium">Old Password</label>
            <div className="flex items-center border rounded pl-3 pr-4 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input type="password" className="w-full outline-none" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">New Password</label>
            <div className="flex items-center border rounded pl-3 pr-4 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input type="password" className="w-full outline-none" />
            </div>
          </div>

          <button className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded flex items-center gap-2">
            <FaEdit /> Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
