import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Calculator, CheckCircle, DollarSign, AlertCircle } from "lucide-react";
// import { carPredictionAPI } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const CarInsurancePrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();
  const { carInsurancePredictionAPI } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handles form submission
  const onSubmit = async (data) => {
    
    
      // Form validation
      if (data.driver_age < 18) {
        toast.error("Driver must be 18 years old or older.");
        return false;
      } else if (data.driver_age > 80) {
        toast.error("Driver must be under 80 years old.");
        return false;
      }

      if (data.driver_age == data.driving_experience) {
        toast.error("Driver age and driving experience cannot be equal");
        return false;
      }

      if (data.driver_age - data.driving_experience < 18) {
        toast.error("Please enter a valid driving experience");
        return false;
      }

      if (data.car_mfg_year < 1950) {
        toast.error("Manufacturing year must be later than 1950.");
        return false;
      } else if (data.car_mfg_year > (new Date().getFullYear())) {
        toast.error("Manufacturing year cannot be in the future.");
        return false;
      }

      if (data.driving_experience < 0) {
        toast.error("Driving experience must be zero or more.");
        return false;
      }
      if (data.prv_accident < 0) {
        toast.error("Previous accident cannot be negative.");
        return false;
      }

      if (data.annual_mileage < 0) {
        toast.error("Mileage cannot be negative.");
        return false;
      }

      // Call the car insurance prediction API
      setIsLoading(true);
      try {
      const result = await carInsurancePredictionAPI(data);
      if (result.success) {
        setPrediction(result.data);
        toast.success("Prediction successful!");
        // console.log("prediction");
        // console.log(result.data);
      } else {
        const errors = result.error;

        // Converts object to readable string
        const message = Object.values(errors).flat().join(" ");

        toast.error(
          message.charAt(0).toUpperCase() + message.slice(1) ||
            "Registration failed."
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Prediction failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // When 'New Prediction' button clicked from result card
  const handleNewPrediction = () => {
    setPrediction(null);
    reset();
  };

  // Handles currency as $
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // For result card
  if (prediction) {
    return (
      <>
        <div className="prediction-form flex justify-center items-center">
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
        <div className="info-card mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                Important Information
              </h4>
              <p className="text-sm">
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
    // <div className="text-white p-8 rounded-3xl shadow-lg max-w-4xl mx-auto border border-gray-800">
    <div className="prediction-form-bg text-white p-8 rounded-3xl shadow-lg w-full ">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Car Insurance Premium Prediction
      </h2>
      <p className="text-gray-400">Please fill in the driver's and car's details to estimate the premium</p>
      <hr className="my-5 opacity-10"/>

      {/* Car Insurance prediction form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        {/* Driver’s Age */}
        <div>
          <label className="form-label">Driver's Age</label>
          <input
            type="number"
            {...register("driver_age", { required: "Required" })}
            placeholder="Enter the Driver's Age"
            className="form-input remove-arrow"
          />
          {errors.driver_age && (
            <p className="text-red-500 text-sm mt-1">
              {errors.driver_age.message}
            </p>
          )}
        </div>

        {/* Driving Experience */}
        <div>
          <label className="form-label">
            Driving Experience
          </label>
          <input
            type="number"
            {...register("driving_experience", { required: "Required" })}
            placeholder="Driving Experience (in years)"
            className="form-input remove-arrow"
          />
          {errors.driving_experience && (
            <p className="text-red-500 text-sm mt-1">
              {errors.driving_experience.message}
            </p>
          )}
        </div>

        {/* Annual Mileage */}
        <div>
          <label className="form-label">Annual Mileage</label>
          <input
            type="number"
            {...register("annual_mileage", { required: "Required" })}
            placeholder="Annual Mileage of Car (x1000km)"
            className="form-input remove-arrow text-ellipsis"
          />
          {errors.annual_mileage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.annual_mileage.message}
            </p>
          )}
        </div>

        {/* Car Manufacturing Year */}
        <div>
          <label className="form-label">
            Car Manufacturing Year
          </label>
          <input
            type="number"
            {...register("car_mfg_year", { required: "Required" })}
            placeholder="Enter the Car Manufacturing Year (in AD)"
            className="form-input remove-arrow"
          />
          {errors.car_mfg_year && (
            <p className="text-red-500 text-sm mt-1">
              {errors.car_mfg_year.message}
            </p>
          )}
        </div>

        {/* Previous Accidents */}
        <div className="md:col-span-1">
          <label className="form-label">
            Previous Accidents
          </label>
          <input
            type="number"
            {...register("prv_accident", { required: "Required" })}
            placeholder="Enter the no. of previous Accidents"
            className="form-input remove-arrow text-ellipsis"
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
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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
    </div>
  );
};

export default CarInsurancePrediction;
