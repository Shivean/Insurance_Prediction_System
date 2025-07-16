import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { authAPI } from "../services/api";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  Save,
  Edit3,
  Calendar,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";  // These are the icons used in the profile page

const ProfilePage = () => {

  const {
    updateProfile,
    loading: authLoading,
    isAuthenticated,
    changePassword,
  } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // For profile update
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    reset,
  } = useForm();

  // For password change
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    watch: watchPassword,
  } = useForm();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchProfileData();
    }
  }, [authLoading, isAuthenticated]);

  // This function fetches the user's profile data from the API
  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await authAPI.getProfile();
      setProfileData(response.data);
      reset(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    }
    setLoading(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await updateProfile(data);
      if (result.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        fetchProfileData(); // Refresh profile data
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (data) => {
    setLoading(true);
    try {
      const result = await changePassword(data);
      if (result.success) {
        toast.success("Password changed successfully!");
        setIsEditing(false);
        fetchProfileData(); // Refresh profile data
      } else {
        toast.error(result.error || "Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred while changing password");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset(profileData); // Reset form to original values
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start gap-8 px-12 py-2">
      {/* Left Profile Card */}

      <div className="bg-[#37474F] text-white p-12 rounded-2xl shadow-lg w-75 md:max-w-sm flex flex-col items-center text-center font-[DM Sans]">
        {loading ? (
          <div className="user-loading-spinner "></div>
        ) : (
          <div>
            <div className=" flex items-center justify-center">
              <div className="bg-gradient-to-r from-[#327c94] to-[#5fb9ff]  text-gray-700 w-24 h-24 rounded-full flex items-center justify-center text-3xl mb-4">
                <User className="w-12 h-12 text-white " />
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-1 capitalize">
              {profileData?.first_name} {profileData?.last_name}
            </h3>

            <p className="text-gray-400 mb-4">{profileData?.email}</p>

            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-200" />
                <span className="text-md text-gray-400">
                  Member since {formatDate(profileData?.date_joined)}
                  {/* Member since 2025-07-08 */}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-200" />
                <span className="text-md text-gray-400">
                  {profileData?.phone_number}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Side Sections */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Personal Info Section */}
        <div className="bg-white rounded-lg p-6 text-md shadow-md font-[sans-serif]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-2xl">Personal Information</h3>

            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="text-md px-4 py-2 rounded-lg flex items-center space-x-2
                    transition-colors duration-300 ease-in-out cursor-pointer 
                    bg-gray-100 text-gray-600 hover:text-white hover:bg-[#C6735C] shadow-sm"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitProfile(onSubmit)}
                  disabled={loading}
                  className="bg-green-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <div className="loading-spinner w-4 h-4"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
          <hr className="mb-4 border-gray-200" />

          <form onSubmit={handleSubmitProfile(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-md">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  defaultValue={profileData?.first_name}
                  {...registerProfile("first_name", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters",
                    },
                  })}
                  disabled={!isEditing} // toggles editability
                  className={`form-input ${!isEditing ? "bg-gray-50" : ""} ${
                    errorsProfile.first_name ? "border-red-500" : ""
                  }`}
                />
                {errorsProfile.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsProfile.first_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-md">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  defaultValue={profileData?.last_name}
                  {...registerProfile("last_name", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                  })}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? "bg-gray-50" : ""} ${
                    errorsProfile.last_name ? "border-red-500" : ""
                  }`}
                />
                {errorsProfile.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsProfile.last_name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-2 font-md">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  defaultValue={profileData?.email}
                  disabled
                  className="form-input bg-gray-50 cursor-not-allowed"
                  style={{ textIndent: "25px" }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-2">
                Email cannot be changed
              </p>
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block mb-2 font-md">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  id="phone_number"
                  defaultValue={profileData?.phone_number}
                  {...registerProfile("phone_number", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[\+]?[1-9][\d]{0,15}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  style={{ textIndent: "25px" }}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? "bg-gray-50" : ""} ${
                    errorsProfile.phone_number ? "border-red-500" : ""
                  }`}
                />
              </div>

              {errorsProfile.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errorsProfile.phone_number.message}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <form
          onSubmit={handleSubmitPassword(handleChangePassword)}
          className="space-y-6"
        >
          <div className="bg-white rounded-lg p-6 shadow-md font-[sans-serif]">
            <h3 className="font-semibold mb-5 text-2xl">Change Password</h3>
            <hr className="mb-4 border-gray-200" />

            {/* Old Password */}
            <div className="mb-4">
              <label className="block mb-2 font-md">Old Password</label>
              <div className="flex items-center border border-gray-300 rounded pl-3 pr-4 py-2">
                <Lock className="text-gray-400 mr-2" />
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="current_password"
                  {...registerPassword("current_password", {
                    required: "Current password is required",
                  })}
                  className="w-full outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className=" top-1/2 transform text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-5 h-5 " />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errorsPassword.current_password && (
                <p className="text-red-500 text-md">
                  {errorsPassword.current_password.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label className="block mb-2 font-md">New Password</label>
              <div className="flex items-center border border-gray-300 rounded pl-3 pr-4 py-2">
                <Lock className="text-gray-400 mr-2" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="new_password"
                  {...registerPassword("new_password", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "New password must be at least 6 characters",
                    },
                  })}
                  className="w-full outline-none text-md"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className=" top-1/2 transform text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5 " />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errorsPassword.new_password && (
                <p className="text-red-500 text-md">
                  {errorsPassword.new_password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-md">Confirm New Password</label>
              <div className="flex items-center border border-gray-300 rounded pl-3 pr-4 py-2">
                <Lock className="text-gray-400 mr-2" />
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  id="confirm_new_password"
                  {...registerPassword("confirm_new_password", {
                    validate: (value) =>
                      value === watchPassword("new_password") ||
                      "Passwords do not match",
                  })}
                  className="w-full outline-none text-md"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                  className=" top-1/2 transform text-gray-400 hover:text-gray-600"
                >
                  {showConfirmNewPassword ? (
                    <EyeOff className="w-5 h-5 " />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errorsPassword.confirm_new_password && (
                <p className="text-red-500 text-md">
                  {errorsPassword.confirm_new_password.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <div className="flex">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-8 py-3 text-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <Edit3 className="w-5 h-5" />
                    <div className="loading-spinner w-5 h-5 mr-3"></div>
                    <span>Changing...</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-5 h-5" />
                    <span>Change Password</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
