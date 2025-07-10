import React from "react";
import { FaKey } from "react-icons/fa";

const CarInsurancePrediction = () => {
  return (
    <div className="bg-gradient-to-b from-[#37474F] to-[#263238] text-white p-8 rounded-3xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-10 font-[Open_Sans]">
        Car Premium Prediction Form
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Driver’s Age */}
        <div>
          <label className="block mb-2 font-[Open_Sans] font-semibold">
            Driver's Age:
          </label>
          <input
            type="number"
            placeholder="Enter the Driver's Age"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
        </div>

        {/* Driving Experience */}
        <div>
          <label className="block mb-2 font-[Open_Sans] font-semibold">
            Driving Experience:
          </label>
          <input
            type="number"
            placeholder="Enter the Driving Experience (in years)"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
        </div>

        {/* Annual Mileage */}
        <div>
          <label className="block mb-2 font-[Open_Sans] font-semibold">
            Annual Mileage:
          </label>
          <input
            type="number"
            placeholder="Enter the Annual Mileage of Vehicle (x1000km)"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
        </div>

        {/* Car Manufacturing Year */}
        <div>
          <label className="block mb-2 font-[Open_Sans] font-semibold">
            Car Manufacturing Year:
          </label>
          <input
            type="number"
            placeholder="Enter the Car Manufacturing Year (in AD)"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
        </div>

        {/* Previous Accidents */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-[Open_Sans] font-semibold">
            Previous Accidents:
          </label>
          <input
            type="number"
            placeholder="Enter the number of previous Accidents"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
        </div>
      </form>

      {/* Submit Button */}
      <div className="mt-10">
        <button
          type="submit"
          className="bg-[#B36F5C] hover:bg-[#9e5a48] transition-colors duration-400 ease-in-out text-white px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer"
        >
          <FaKey /> Predict
        </button>
      </div>

      {/* Predicted Result */}
      <p className="text-white mt-6 text-right text-lg font-[Open_Sans] hidden">
        The Predicted Amount for your choices is{" "}
        <span className="font-semibold">$200</span>
      </p>
    </div>
  );
};

export default CarInsurancePrediction;
