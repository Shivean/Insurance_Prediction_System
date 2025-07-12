import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { authAPI } from "../services/api";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaPhoneAlt,
  FaLock,
  FaEdit,
  FaEnvelope,
  FaSave,
} from "react-icons/fa";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Edit3,
  Shield,
  Calendar,
  Heart,
  Lock,
} from "lucide-react";

const ProfilePage = () => {
  const { user, updateProfile, loading: authLoading, isAuthenticated, changePassword } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchProfileData();
    }
  }, [authLoading, isAuthenticated]);

  const fetchProfileData = async () => {
    try {
      const response = await authAPI.getProfile();
      setProfileData(response.data);
      reset(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    }
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

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (!isAuthenticated) {
    return <div className="flex justify-center items-center h-screen">You must be logged in to view this page.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start gap-8 px-12 py-2">
      {/* Left Profile Card */}
      <div className="bg-[#37474F] text-white p-12 rounded-2xl shadow-lg w-75 md:max-w-sm flex flex-col items-center text-center font-[DM Sans]">
        <div className="bg-gradient-to-r from-[#327c94] to-[#5fb9ff]  text-gray-700 w-24 h-24 rounded-full flex items-center justify-center text-3xl mb-4">
          <User className="w-12 h-12 text-white " />
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
                  onClick={handleSubmit(onSubmit)}
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-md">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  defaultValue={profileData?.first_name}
                  {...register("first_name", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters",
                    },
                  })}
                  disabled={!isEditing} // toggles editability
                  className={`form-input ${!isEditing ? "bg-gray-50" : ""} ${
                    errors.first_name ? "border-red-500" : ""
                  }`}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.first_name.message}
                  </p>
                  // <p className="text-red-500 text-sm mt-1">First name must be at least 2 characters</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-md">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  defaultValue={profileData?.last_name}
                  {...register("last_name", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                  })}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? "bg-gray-50" : ""} ${
                    errors.last_name ? "border-red-500" : ""
                  }`}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.last_name.message}
                  </p>
                  // <p className="text-red-500 text-sm mt-1">Last name must be at least 2 characters</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-md">Email</label>
              <div className="bg-gray-50 flex items-center border border-gray-300 rounded pl-3 pr-4 py-2">
                <Mail className="text-gray-400 mr-2" />
                <input
                  type="email"
                  id="email"
                  defaultValue={profileData?.email}
                  disabled
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-2">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label className="block mb-2 font-md">Phone Number</label>
              <div className="bg-gray-50 flex items-center border border-gray-300 rounded pl-3 pr-4 py-2">
                <Phone className="text-gray-400 mr-2" />
                <input
                  type="tel"
                  id="phone_number"
                  defaultValue={profileData?.phone_number}
                  {...register("phone_number", {
                    pattern: {
                      value: /^[\+]?[1-9][\d]{0,15}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  disabled={!isEditing}

                />
              </div>
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <form
          onSubmit={handleSubmit(handleChangePassword)}
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
                  type="password"
                  id="current_password"
                  {...register("current_password", {
                    required: "Current password is required",
                  })}
                  className="w-full outline-none text-sm"
                />
                {errors.current_password && (
                  <p className="text-red-500 text-sm">
                    {errors.current_password.message}
                  </p>
                )}
                
              </div>
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label className="block mb-2 font-md">New Password</label>
              <div className="flex items-center border border-gray-300 rounded pl-3 pr-4 py-2">
                <Lock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  id="new_password"
                  {...register("new_password", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "New password must be at least 6 characters",
                    },
                  })}
                  className="w-full outline-none text-sm"
                />
                {errors.current_password && (
                  <p className="text-red-500 text-sm">
                    {errors.current_password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-md">Confirm New Password</label>
              <div className="flex items-center border border-gray-300 rounded pl-3 pr-4 py-2">
                <Lock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  id="confirm_new_password"
                  {...register("confirm_new_password", {
                    validate: (value) =>
                      value === watch("new_password") ||
                      "Passwords do not match",
                  })}
                  className="w-full outline-none text-sm"
                />
                {errors.current_password && (
                  <p className="text-red-500 text-sm">
                    {errors.current_password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit(handleChangePassword)}
              className="bg-[#2c3940] hover:text-black hover:bg-[#DB8A74] text-white py-2 px-4 rounded-lg flex items-center gap-2 text-sm transition-colors duration-300 ease-in-out cursor-pointer"
            >
              <Edit3 /> Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
