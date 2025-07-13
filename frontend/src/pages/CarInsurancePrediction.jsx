import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Calculator, CheckCircle, DollarSign, AlertCircle } from "lucide-react";
import { carPredictionAPI } from "../services/api";

const CarInsurancePrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await carPredictionAPI.createPrediction(data);
      setPrediction(res.data);
      toast.success("Prediction successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Prediction failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPrediction = () => {
    setPrediction(null);
    reset();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (prediction) {
    return (
      <>
        <div className="prediction-form">
          <div className="result-card">
            <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Prediction Complete!</h2>
            <div className="text-6xl font-bold mb-4">
              {formatCurrency(prediction.predicted_car_premium)}
            </div>
            <p className="text-xl mb-6 opacity-90">Estimated Annual Premium</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleNewPrediction}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Calculator className="w-4 h-4" />
                <span>New Prediction</span>
              </button>

              <button
                onClick={() => navigate("/main/history")}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <DollarSign className="w-4 h-4" />
                <span>View History</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                Important Information
              </h4>
              <p className="text-sm text-blue-700">
                This prediction is based on machine learning algorithms and
                historical data. The actual premium may vary based on additional
                factors and insurance provider policies. This is for
                informational purposes only and should not be considered as a
                final quote.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#37474F] to-[#263238] text-white p-8 rounded-3xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Car Insurance Premium Prediction Form
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Driver’s Age */}
        <div>
          <label className="block mb-2 font-semibold">Driver's Age:</label>
          <input
            type="number"
            {...register("driver_age", { required: "Required" })}
            placeholder="Enter the Driver's Age"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
          {errors.driver_age && (
            <p className="text-red-500 text-sm mt-1">
              {errors.driver_age.message}
            </p>
          )}
        </div>

        {/* Driving Experience */}
        <div>
          <label className="block mb-2 font-semibold">
            Driving Experience:
          </label>
          <input
            type="number"
            {...register("driving_experience", { required: "Required" })}
            placeholder="Enter the Driving Experience (in years)"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
          {errors.driving_experience && (
            <p className="text-red-500 text-sm mt-1">
              {errors.driving_experience.message}
            </p>
          )}
        </div>

        {/* Annual Mileage */}
        <div>
          <label className="block mb-2 font-semibold">Annual Mileage:</label>
          <input
            type="number"
            {...register("annual_mileage", { required: "Required" })}
            placeholder="Enter the Annual Mileage of Vehicle (x1000km)"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
          {errors.annual_mileage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.annual_mileage.message}
            </p>
          )}
        </div>

        {/* Car Manufacturing Year */}
        <div>
          <label className="block mb-2 font-semibold">
            Car Manufacturing Year:
          </label>
          <input
            type="number"
            {...register("car_mfg_year", { required: "Required" })}
            placeholder="Enter the Car Manufacturing Year (in AD)"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
          {errors.car_mfg_year && (
            <p className="text-red-500 text-sm mt-1">
              {errors.car_mfg_year.message}
            </p>
          )}
        </div>

        {/* Previous Accidents */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-semibold">
            Previous Accidents:
          </label>
          <input
            type="number"
            {...register("prv_accident", { required: "Required" })}
            placeholder="Enter the number of previous Accidents"
            className="w-full rounded-full px-4 py-2 text-gray-100 bg-transparent border border-gray-300 placeholder-gray-400 focus:outline-none remove-arrow"
          />
          {errors.prv_accident && (
            <p className="text-red-500 text-sm mt-1">
              {errors.prv_accident.message}
            </p>
          )}
        </div>
      </form>

      {/* Submit Button */}
      <div className="flex mt-5">
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="btn-primary px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="loading-spinner w-5 h-5 mr-3"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <Calculator className="w-5 h-5" />
              <span>Calculate Premium</span>
            </>
          )}
        </button>
      </div>

      {/* Predicted Result */}
      <p className="text-white mt-6 text-right text-lg hidden">
        The Predicted Amount for your choices is{" "}
        <span className="font-semibold">$200</span>
      </p>
    </div>
  );
};

export default CarInsurancePrediction;
