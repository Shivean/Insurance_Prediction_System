import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaPhoneAlt,
  FaLock,
  FaEdit,
  FaEnvelope,
  FaSave,
} from "react-icons/fa";

const ProfilePage = () => {
  const [name, setName] = useState("Shivaram");
  const [tempName, setTempName] = useState("Shivaram");

  const [lastName, setLastName] = useState("Chalisae");
  const [tempLastName, setTempLastName] = useState("Chalisae");

  const [email, setEmail] = useState("shivaramchalisae@gmail.com");
  const [tempEmail, setTempEmail] = useState("shivaramchalisae@gmail.com");

  const [phoneNumber, setPhoneNumber] = useState("+977 9841234567");
  const [tempPhoneNumber, setTempPhoneNumber] = useState("+977 9841234567");

  const [isEditing, setIsEditing] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    // Copy saved values into temporary ones
    setTempName(name);
    setTempLastName(lastName);
    setTempEmail(email);
    setTempPhoneNumber(phoneNumber);
  };

  const handleChangePassword = () => {
    if (oldPassword !== newPassword) {
      setError("Old and new passwords do not match.");
    } else {
      setError("");
      // Proceed with actual password update logic here
      alert("Password changed successfully!");
      // Optionally clear fields
      setOldPassword("");
      setNewPassword("");
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setName(tempName);
    setLastName(tempLastName);
    setEmail(tempEmail);
    setPhoneNumber(tempPhoneNumber);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start gap-8 px-12 py-2">
      {/* Left Profile Card */}
      <div className="bg-[#37474F] text-white p-12 rounded-2xl shadow-lg w-full md:max-w-sm flex flex-col items-center text-center font-[DM Sans]">
        <div className="bg-gray-300 text-gray-700 w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4">
          👤
        </div>
        <h2 className="text-xl ">
          {name} {lastName}
        </h2>
        <p className="text-sm text-gray-300 ">{email}</p>
        <div className="mt-6 text-sm text-gray-300 flex flex-col gap-3 items-start w-full px-4">
          <p className="flex items-center gap-4">
            <FaCalendarAlt /> Member Since September 5, 2005
          </p>
          <p className="flex items-center gap-4">
            <FaPhoneAlt /> {phoneNumber}
          </p>
        </div>
      </div>

      {/* Right Side Sections */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Personal Info Section */}
        <div className="bg-white rounded-lg p-6 shadow-md font-[Poppins]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-1xl">Personal Information</h3>
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className={`flex items-center gap-x-1 text-sm px-3 py-1.5 rounded 
              transition-colors duration-300 ease-in-out
              
                  bg-gray-100 text-gray-600 hover:text-white hover:bg-[#C6735C]`}
            >
              {isEditing ? (
                <FaSave className="w-4 h-4" />
              ) : (
                <FaEdit className="w-4 h-4" />
              )}
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          <hr className="mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium">First Name</label>
              <input
                type="text"
                value={tempName}
                readOnly={!isEditing} // toggles editability
                onChange={
                  isEditing ? (e) => setTempName(e.target.value) : undefined
                }
                className={`text-sm border rounded px-4 py-2 w-full ${
                  isEditing ? "cursor-text" : "cursor-default"
                } ${isEditing ? "editable" : "readonly"}`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium">Last Name</label>
              <input
                type="text"
                value={tempLastName} // Make sure lastName is stateful
                readOnly={!isEditing}
                onChange={
                  isEditing ? (e) => setTempLastName(e.target.value) : undefined
                }
                className={`text-sm border rounded px-4 py-2 w-full cursor-default ${
                  isEditing ? "cursor-text" : "cursor-default"
                } ${isEditing ? "editable" : "readonly"}`}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium">Email</label>
            <div className="flex items-center border rounded pl-3 pr-4 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                value={tempEmail} // Make sure email is stateful
                readOnly={!isEditing}
                onChange={
                  isEditing ? (e) => setTempEmail(e.target.value) : undefined
                }
                className={`w-full outline-none text-sm cursor-default ${
                  isEditing ? "cursor-text" : "cursor-default"
                } ${isEditing ? "editable" : "readonly"}`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium">Phone Number</label>
            <div className="flex items-center border rounded pl-3 pr-4 py-2">
              <FaPhoneAlt className="text-gray-400 mr-2" />
              <input
                type="tel"
                value={tempPhoneNumber} // Make sure phoneNumber is stateful
                readOnly={!isEditing}
                onChange={
                  isEditing
                    ? (e) => setTempPhoneNumber(e.target.value)
                    : undefined
                }
                className={`w-full outline-none text-sm cursor-default ${
                  isEditing ? "cursor-text" : "cursor-default"
                } ${isEditing ? "editable" : "readonly"}`}
              />
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-lg p-6 shadow-md font-[Poppins]">
          <h3 className="text-1xl font-semibold mb-2">Change Password</h3>
          <hr className="mb-4" />

          {/* Old Password */}
          <div className="mb-4">
            <label className="block text-xs font-medium">Old Password</label>
            <div className="flex items-center border rounded pl-3 pr-4 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block font-medium text-xs">New Password</label>
            <div className="flex items-center border rounded pl-3 pr-4 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

          {/* Submit Button */}
          <button
            onClick={handleChangePassword}
            className="bg-gray-200 hover:text-white hover:bg-[#DB8A74] text-black py-2 px-4 rounded flex items-center gap-2 text-sm transition-colors duration-300 ease-in-out cursor-pointer"
          >
            <FaEdit /> Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
