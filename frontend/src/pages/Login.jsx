import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaLock, FaKey } from 'react-icons/fa';
import { User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../assets/insure-predict-cropped.png";

const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const { register: registerUser } = useAuth();
    // const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2f4f4f] px-4">
      <div className="bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-8 rounded-xl w-100 shadow-lg">
        <div className="flex flex-col items-center mb-6">
          {/* <img src={logo} alt="InsurePredict Logo" className="h-13 mb-8" /> */}
          <div className="w-16 h-16 border-2 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="form-label">Email:</label>
          <div className='relative'>
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            
            <input
              type="email"
              placeholder="Enter your Email"
              className="form-input"
              style={{textIndent: '25px'}}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="form-label">Password:</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              style={{textIndent: '25px'}}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" >

                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
          </div>
        </div>

        {/* Register Button */}
        <div className='flex justify-center'>
            <button
                type="submit"
                disabled={isLoading}
                className="bg-[#c1664e] text-</div>white w-40 py-2 rounded-md hover:bg-[#a5543f] transition-all duration-200 flex items-center justify-center gap-2">
                
            <FaKey />
            {isLoading ? (
              <div className="loading-spinner w-5 h-5"></div>
            ) : (
              'Sign In'
            )}
            </button>
        </div>

        {/* Login link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
