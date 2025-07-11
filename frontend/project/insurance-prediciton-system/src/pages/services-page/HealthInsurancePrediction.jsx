import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const RadioGroup = ({ label, name }) => (
  <fieldset className="mb-6 border border-[#FAFAFA] p-4 rounded-md">
    <legend className="text-white font-semibold mb-2 px-2">{label}</legend>
    <div className="flex gap-8">
      {["yes", "no"].map((value) => (
        <label
          key={value}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#2B3A42] rounded-full cursor-pointer transition-colors duration-300 hover:bg-[#3A4B55]"
        >
          <input
            type="radio"
            name={name}
            value={value}
            className="accent-white w-4 h-4"
          />
          <span className="capitalize">{value}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

const HealthInsurancePrediction = () => {
  return (
    <div className="bg-gradient-to-b from-[#37474F] to-[#263238] text-white p-8 rounded-3xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-8 font-[Open_Sans]">
        Health Premium Prediction Form
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Height */}
        <div>
          <label className="block mb-2 font-[Open_Sans] font-semibold">
            Height:
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="ft"
              className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
            />
            <input
              type="number"
              placeholder="inches"
              className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
            />
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-2 font-[Open_Sans]font-semibold">
            Weight:
          </label>
          <input
            type="number"
            placeholder="kg"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
        </div>

        {/* Radio fields */}
        <RadioGroup label="Diabetes?:" name="diabetes" />
        <RadioGroup label="Pressure Issue?" name="pressure" />
        <RadioGroup label="Any Body Part Transplants?:" name="transplants" />
        <RadioGroup label="Any other chronic diseases?:" name="chronic" />
        <RadioGroup label="Any known Allergies?:" name="allergies" />
        <RadioGroup label="History of Cancer in Family?:" name="cancer" />

        {/* Surgeries */}
        <div>
          <label className="block mb-2 font-semibold font-[Open_Sans]">
            Number of Major Surgeries: (number)
          </label>
          <input
            type="number"
            placeholder="0 - X"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-2 font-semibold font-[Open_Sans]">
            Age:
          </label>
          <input
            type="number"
            placeholder="Enter the age of the person"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
        </div>
      </form>

      {/* Submit button */}
      <div className="mt-8">
        <button
          type="submit"
          className="bg-[#B36F5C] hover:bg-[#9e5a48] transition-colors duration-400 ease-in-out text-white px-6 py-2 rounded-full flex items-center gap-2 cursor-pointer"
        >
          <FaPaperPlane /> Predict
        </button>
      </div>
    </div>
  );
};

export default HealthInsurancePrediction;
