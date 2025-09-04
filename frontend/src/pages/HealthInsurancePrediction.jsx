import { useState, React } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CheckCircle, Calculator, DollarSign, AlertCircle } from "lucide-react";
import { healthPredictionAPI } from "../services/api";

const HealthInsurancePrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();

  // Initializes form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  // Handles form submission
  const onSubmit = async (data) => {
    const { heightFt, heightIn, ...rest } = data;

    // Convert height to centimeters
    {
      console.log(data.heightFt, data.heightIn);
    }
    const heightInCM =
      parseInt(data.heightFt || 0) * 30.48 +
      parseInt(data.heightIn || 0) * 2.54;

    const payload = {
      ...rest,
      height: heightInCM,
    };

    // Form Validation

    if (data.age < 18) {
      toast.error("Age must be at least 18 years old.");
      return false;
    } else if (data.age > 110) {
      toast.error("Please enter a valid age.");
      return false;
    }

    if(heightInCM > 215 || heightInCM < 55) {
      toast.error("Please enter a valid height.");
      return false;
    }

    if (data.weight < 15) {
      toast.error("Weight must be more than 15 kg.");
      return false;
    } else if (data.weight > 300) {
      toast.error("Weight must be under 300 kg.");
      return false;
    }

    if (data.no_of_major_surgery < 0) {
      toast.error("No. of surgery cannot be negative.");
      return false;
    } else if (data.no_of_major_surgery > 100) {
      toast.error("Please enter a valid no. of surgery.");
      return false;
    }

    setIsLoading(true);
    // Calls the API to create a prediction
    try {
      const res = await healthPredictionAPI.createPrediction(payload);
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

  const renderRadioGroup = (label, name) => (
    <div className="col-span-1">
      <p className="mb-2 font-semibold">{label}</p>
      <div className="flex gap-6">
        {["yes", "no"].map((option) => (
          <label
            key={option}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer ${
              watch(name) === option ? "bg-[#3490b1]" : "bg-[#2B3A42]"
            } hover:ring-2 hover:ring-[#3490b1] transition`}
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Displays the prediction result
  if (prediction) {
    return (
      <>
        <div className="prediction-form flex justify-center items-center">
          <div className="result-card">
            <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Prediction Complete!</h2>
            <div className="text-6xl font-bold mb-4">
              {formatCurrency(prediction.predicted_health_premium)}
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
              <h4 className="text-sm font-medium text-[#0D47A1] mb-1">
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
    // Main form for health insurance prediction
    <div className="prediction-form-bg text-white p-8 rounded-3xl shadow-lg w-full mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-8 ">
        Health Insurance Premium Prediction
      </h2>
      <p className="text-gray-400">Please provide your personal and health details to estimate your insurance premium.</p>
      <hr className="opacity-20 my-5"/>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Height */}
        <div>
          <label className="form-label">Height</label>
          <div className="flex gap-4">
            <div>
              <input
                type="number"
                placeholder="ft"
                {...register("heightFt", { required: "Required" })}
                className="form-input remove-arrow"
              />
              {errors.heightFt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.heightFt.message}
                </p>
              )}
            </div>
            
            <div>
              <input
                type="number"
                {...register("heightIn", { required: "Required" })}
                placeholder="inches"
                className="form-input remove-arrow"
              />
              {errors.heightIn && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.heightIn.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="form-label">Weight</label>
          <input
            type="number"
            step="any"
            placeholder="kg"
            {...register("weight", { required: "Required" })}
            className="form-input remove-arrow"
          />
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
          )}
        </div>

        {/* Radio fields */}
        <fieldset className="md:col-span-2 border border-gray-200 p-6 rounded-2xl">
          <legend className="form-label">
            Medical History
          </legend>
          <div className="grid md:grid-cols-2 gap-6">
            {renderRadioGroup("Diabetes?", "has_diabetes")}
            {renderRadioGroup("Pressure issue?", "has_pressure_issue")}
            {renderRadioGroup(
              "Any body part transplants?",
              "any_bodytransplant"
            )}
            {renderRadioGroup("Any chronic diseases?", "any_chronic_disease")}
            {renderRadioGroup("Any known allergies?", "any_allergies")}
            {renderRadioGroup(
              "History of cancer in family?",
              "history_of_cancer_in_family"
            )}
          </div>
        </fieldset>

        {/* Surgeries */}
        <div>
          <label className="form-label">
            Number of Major Surgeries
          </label>
          <input
            type="number"
            placeholder="Enter the no. of surgeries"
            {...register("no_of_major_surgery", { required: "Required" })}
            className="form-input remove-arrow"
          />
          {errors.no_of_major_surgery && (
            <p className="text-red-500 text-sm mt-1">
              {errors.no_of_major_surgery.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="form-label">Age</label>
          <input
            type="number"
            placeholder="Enter the age"
            {...register("age", { required: "Required" })}
            className="form-input remove-arrow"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* Submit button */}
        <div className="flex">
          <button
            type="submit"
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
      </form>
    </div>
  );
};

export default HealthInsurancePrediction;
