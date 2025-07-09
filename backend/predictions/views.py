from django.shortcuts import render
from rest_framework import serializers, response, status
from rest_framework.decorators import api_view
from .serializers import HealthInsuranceSerializer, CarInsuranceSerializer
import joblib
from .models import PredictionHistory

health_prediction_model = joblib.load('ml_model/health_prediction_model.pkl')
car_predicition_model = joblib.load('ml_model/car_insurance_prediction_model.pkl')

# Create your views here.
@api_view
def HealthInsurancePrediction(request):
    serializers = HealthInsuranceSerializer(data = request.data)

    if serializers.is_valid():
        prediction_data = serializers.validated_data

        ml_input = {
            'age': prediction_data['age'],
            'height': prediction_data['height'],
            'weight': prediction_data['weight'],
            'has_diabetes': prediction_data['has_diabetes'],
            'has_pressure_issue': prediction_data['has_pressure_issue'],
            'any_bodytransplant': prediction_data['any_bodytransplant'],
            'any_chronic_disease': prediction_data['any_chronic_disease'],
            'any_allergies': prediction_data['any_allergies'],
            'history_of_cancer_in_family': prediction_data['history_of_cancer_in_family'],
            'no_of_major_surgery': prediction_data['no_of_major_surgery']
        }

        try:
            predicted_health_premium = health_prediction_model.predict(ml_input)

            # Saving prediction to database
            prediction = PredictionHistory.objects.create(
                user = request.user,
                predicted_premium = predicted_health_premium,
                insurance_type = 'health', 
                **prediction_data)
            
            # response_serializer = HealthInsuranceSerializer(prediction)

            return response({
                'message': predicted_health_premium
            }, status = status.HTTP_200_OK)
        except Exception as e:
            return response({
                    'error': f'Prediction failed: {str(e)}'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    return response(serializers.errors, status = status.HTTP_400_BAD_REQUEST)

# For Car Insurance Prediction
@api_view
def CarInsurancePrediction(request):
    serializers = CarInsuranceSerializer(data = request.data)

    if serializers.is_valid():
        prediction_data = serializers.validated_data

        ml_input = {
            'driver_age': prediction_data['driver_age'],
            'driving_experience': prediction_data['driving_experience'],
            'annual_mileage': prediction_data['annual_mileage'],
            'car_mfg_year': prediction_data['car_mfg_year'],
            'prv_accident': prediction_data['prv_accident'],
        }

        try:
            predicted_car_premium = car_predicition_model.predict(ml_input)

            # Saving prediction to database

            prediction = PredictionHistory.objects.create(
                user = request.user, 
                predicted_premium = predicted_car_premium,
                insurance_type = 'car', 
                **prediction_data)
            
            return response({
                'message': predicted_car_premium
                }, status = status.HTTP_200_OK)
        
        except Exception as e:
            return response({
                'error': f'Prediction failed: {str(e)}'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return response(serializers.errors, status = status.HTTP_400_BAD_REQUEST)
