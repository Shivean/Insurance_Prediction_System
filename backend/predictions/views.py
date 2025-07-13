from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import HealthInsuranceSerializer, CarInsuranceSerializer, PredictionHistorySerializer
import joblib
from django.db.models import Max
from .models import PredictionHistory

# Loading the pre-trained machine learning models
health_prediction_model = joblib.load('ml_model/health_prediction_model.pkl')
car_predicition_model = joblib.load('ml_model/car_insurance_prediction_model.pkl')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def HealthInsurancePrediction(request):
    serializers = HealthInsuranceSerializer(data = request.data)

    if serializers.is_valid():
        prediction_data = serializers.validated_data
        
        input_data = {  # Input data is organized into a dictionary since 'input_data' is a JSONField in the model
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

        # This is the input data for the ML model in 2D array format
        ml_input = ([[
            prediction_data['age'],
            prediction_data['height'],
            prediction_data['weight'],
            prediction_data['has_diabetes'],
            prediction_data['has_pressure_issue'],
            prediction_data['any_bodytransplant'],
            prediction_data['any_chronic_disease'],
            prediction_data['any_allergies'],
            prediction_data['history_of_cancer_in_family'],
            prediction_data['no_of_major_surgery']
        ]])

        try:
            predicted_health_premium = health_prediction_model.predict(ml_input) # Here, ML model performs prediction on given input

            # Saving prediction to database (Table: PredictionHistory)
            PredictionHistory.objects.create(
                user = request.user,
                input_data = input_data,
                predicted_premium = predicted_health_premium,
                insurance_type = 'health'
                )

            return Response({
                'predicted_health_premium': predicted_health_premium # The result is a 1D array, so we can directly return it
            }, status = status.HTTP_200_OK)
        except Exception as e:
            return Response({
                    'error': f'Prediction failed: {str(e)}'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    return Response(serializers.errors, status = status.HTTP_400_BAD_REQUEST)

# For Car Insurance Prediction
@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def CarInsurancePrediction(request):
    serializers = CarInsuranceSerializer(data = request.data)

    if serializers.is_valid():
        prediction_data = serializers.validated_data

        input_data = { # Input data is organized into a dictionary since 'input_data' is a JSONField in the model
            'driver_age': prediction_data['driver_age'],
            'driving_experience': prediction_data['driving_experience'],
            'annual_mileage': prediction_data['annual_mileage'],
            'car_mfg_year': prediction_data['car_mfg_year'],
            'prv_accident': prediction_data['prv_accident'],
        }

        ml_input = ([[ # This is the input data for the ML model in 2D array format
            prediction_data['driver_age'],
            prediction_data['driving_experience'],
            prediction_data['annual_mileage'],
            prediction_data['car_mfg_year'],
            prediction_data['prv_accident'],
        ]])

        try:
            predicted_car_premium = car_predicition_model.predict(ml_input)
            predicted_car_premium = round(predicted_car_premium[0], 2) # Round the result to two decimal places

            # Saving prediction to database
            PredictionHistory.objects.create(
                user = request.user,
                input_data = input_data, 
                predicted_premium = predicted_car_premium,
                insurance_type = 'car')
            
            return Response({
                'predicted_car_premium': predicted_car_premium # The result is a 1D array, so we can directly return it
                }, status = status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                'error': f'Prediction failed: {str(e)}'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(serializers.errors, status = status.HTTP_400_BAD_REQUEST)

# Dashboard Stats
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def DashboardInfo(request):
    user = request.user

    # Total number of predictions made by the user
    total_prediction = PredictionHistory.objects.filter(user=user).count()

    # Last prediction date
    last_prediction = PredictionHistory.objects.filter(user=user).aggregate(
        last_date=Max('created_at')
    )['last_date']

    return Response({
        'total_predictions': total_prediction,
        'last_prediction_date': last_prediction
    }, status = status.HTTP_200_OK)

# User prediction history
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserPredictionHistory(request):
    user = request.user
    
    history = PredictionHistory.objects.filter(user=user).order_by('-created_at')
    serializer = PredictionHistorySerializer(history, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])  
def DeletePrediction(request, pk):
    try:
        prediction = PredictionHistory.objects.get(pk=pk, user=request.user)
        prediction.delete()
        return Response({'message': 'Prediction deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)