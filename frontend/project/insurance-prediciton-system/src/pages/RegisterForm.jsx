import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/insure-predict-cropped.png";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await registerUser(data);
      if (result.success) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(result.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2f4f4f] px-4">
      <div className="bg-gradient-to-b from-[#325259] via-[#203a43] to-[#2c5364] text-white p-8 mt-4 mb-4 rounded-xl w-full max-w-md shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="InsurePredict Logo" className="h-13 mb-8" />
          <div className="w-16 h-16 border-2 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-[Open_Sans]">
            Create Account
          </h2>
          <p className="text-gray-400 text-center">
            Join us to start predicting insurance premiums
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Personal Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Personal Name:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* First Name */}
              <div className="w-full">
                <input
                  type="text"
                  {...register("first_name", {
                    required: "First name is required.",
                    minLength: {
                      value: 2,
                      message: "Must be at least 2 characters.",
                    },
                  })}
                  placeholder="First Name"
                  className={`w-full px-3 py-2 rounded-md border text-white placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.first_name
                      ? "border border-red-500 outline-none focus:outline-none focus:ring-0"
                      : ""
                  }`}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="w-full">
                <input
                  type="text"
                  {...register("last_name", {
                    required: "Last name is required.",
                    minLength: {
                      value: 2,
                      message: "Must be at least 2 characters.",
                    },
                  })}
                  placeholder="Last Name"
                  className={`w-full px-3 py-2 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c1664e] ${
                    errors.last_name ? "border border-red-500" : ""
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Email:
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your Email"
                className={`pl-10 w-full px-3 py-2 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? "border border-red-500" : ""
                }`}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Phone Number:
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                {...register("phone_number", {
                  pattern: {
                    value: /^\+?[1-9]\d{0,15}$/,
                    message: "Invalid phone number",
                  },
                })}
                placeholder="Enter your phone number"
                className="pl-10 w-full px-3 py-2 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Password:
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "At least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message:
                      "Must contain an uppercase, lowercase, and a number",
                  },
                })}
                className={`pl-10 pr-10 w-full px-3 py-2 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? "border border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-1">
              Confirm Password:
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`pl-10 pr-10 w-full px-3 py-2 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirm_password ? "border border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#c1664e] text-white w-40 py-2 rounded-md cursor-pointer hover:bg-[#a5543f] transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="loading-spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlusIcon className="w-5 h-5" /> Create Account
                </>
              )}
            </button>
          </div>
        </form>

        {/* Login link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-500 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
