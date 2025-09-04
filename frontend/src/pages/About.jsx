import React from "react";
import { Laptop, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#2f4f4f] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mt-5 mb-5 mx-auto px-6 py-8 text-gray-800 layout-main rounded-lg shadow-xl">
      {/* <div className="max-w-4xl mt-5 mb-5 mx-auto px-6 py-8 text-gray-800 bg-[#cfe8ed] rounded-lg shadow-xl"> */}
        <div className="flex justify-between">
          <Home
            className="inline-block mr-2 text-gray-900 hover:text-orange-300 cursor-pointer transition-colors duration-300 "
            onClick={() => navigate("/")}
          />
          <ThemeToggle />
        </div>

        <h1 className="text-5xl font-bold mb-8 text-center text-black-800">
          About the Insurance Prediction System
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          Welcome to the{" "}
          <strong className="text-black-600">
            Insurance Prediction System
          </strong>
          , a web platform that estimates insurance premiums based on a user's
          health, vehicle, and medical details.
        </p>

        <p className="mb-8 text-lg text-gray-600">
          This project was developed as a part of our{" "}
          <strong className="text-black-600">
            BCA 6th Semester Minor Project
          </strong>
          . Our team aimed to combine web development and machine learning to
          develop a real-world solution that is practical and easy to use.
        </p>

        <div className="p-6 rounded-lg border border-gray-200 shadow-[10px_10px_150px_rgba(0,0,0,0.2)] mt-14 mb-2">
          <h2 className="text-3xl font-semibold mb-4 text-black-700">
            <Laptop className="inline-block mr-2 text-gray-900 size-10 pb-2" />
            {/* <Laptop className="inline-block mr-2 text-gray-900 h-8 w-8" /> */}
            Technology Stack
          </h2>
          <ul className="list-disc list-inside mb-6 text-lg text-gray-600">
            <li>
              <strong className="text-black-600">Frontend:</strong> React.js +
              Vite
            </li>
            <li>
              <strong className="text-black-600">Backend:</strong> Django with
              Django REST Framework
            </li>
            <li>
              <strong className="text-black-600">Machine Learning:</strong>{" "}
              Python with scikit-learn
            </li>
            <li>
              <strong className="text-black-600">Database:</strong> PostgreSQL
            </li>
            <li>
              <strong className="text-black-600">Deployment:</strong> Netlify
              (frontend), Render (backend) and Database (Supabase)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
