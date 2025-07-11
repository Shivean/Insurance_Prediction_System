import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import { predictionAPI } from "../../services/api"; // adjust path

const HealthInsurancePrediction = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    // Convert height to meters
    const heightInMeters =
      parseInt(data.heightFt || 0) * 0.3048 +
      parseInt(data.heightIn || 0) * 0.0254;

    const payload = {
      ...data,
      height: heightInMeters,
    };

    try {
      const res = await predictionAPI.createPrediction(payload);
      toast.success("Prediction successful!");
      navigate("/dashboard"); // or wherever
    } catch (err) {
      toast.error(err.response?.data?.message || "Prediction failed.");
    }
  };

  const renderRadioGroup = (label, name) => (
    <div className="col-span-1">
      <p className="mb-2 font-semibold">{label}</p>
      <div className="flex gap-6">
        {["yes", "no"].map((option) => (
          <label
            key={option}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer ${
              watch(name) === option ? "bg-[#4A6572]" : "bg-[#2B3A42]"
            } hover:bg-[#3A4B55] transition`}
          >
            <input
              type="radio"
              {...register(name, { required: "Required" })}
              value={option}
              className="hidden"
            />
            <span className="capitalize text-white">{option}</span>
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className="text-red-400 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-[#37474F] to-[#263238] text-white p-8 rounded-3xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-8 font-[Open_Sans]">
        Health Premium Prediction Form
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Height */}
        <div>
          <label className="block mb-2 font-[Open_Sans] font-semibold">
            Height:
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="ft"
              {...register("heightFt", { required: "Required" })}
              className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
            />
            <input
              type="number"
              placeholder="inches"
              {...register("heightIn", { required: "Required" })}
              className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
            />
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-2 font-[Open_Sans] font-semibold">
            Weight:
          </label>
          <input
            type="number"
            placeholder="kg"
            {...register("weight", { required: "Required" })}
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
        </div>

        {/* Radio fields */}
        <fieldset className="md:col-span-2 border border-gray-400 p-6 rounded-2xl">
          <legend className="text-lg font-semibold mb-4 px-2">
            Medical History
          </legend>
          <div className="grid md:grid-cols-2 gap-6">
            {renderRadioGroup("Diabetes?", "diabetes")}
            {renderRadioGroup("Pressure Issue?", "pressure")}
            {renderRadioGroup("Any Body Part Transplants?", "transplants")}
            {renderRadioGroup("Any other chronic diseases?", "chronic")}
            {renderRadioGroup("Any known Allergies?", "allergies")}
            {renderRadioGroup("History of Cancer in Family?", "cancer")}
          </div>
        </fieldset>

        {/* Surgeries */}
        <div>
          <label className="block mb-2 font-semibold font-[Open_Sans]">
            Number of Major Surgeries:
          </label>
          <input
            type="number"
            placeholder="0 - X"
            {...register("surgeries", { required: "Required" })}
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
            placeholder="Enter the age"
            {...register("age", { required: "Required" })}
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
        </div>

        {/* Submit button */}
        <div className="md:col-span-2 mt-4 text-center">
          <button
            type="submit"
            className="bg-[#B36F5C] hover:bg-[#9e5a48] transition-colors duration-400 ease-in-out text-white px-6 py-2 rounded-full flex items-center gap-2 mx-auto"
          >
            <FaPaperPlane /> Predict
          </button>
        </div>
      </form>
    </div>
  );
};

export default HealthInsurancePrediction;
