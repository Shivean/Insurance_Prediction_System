from rest_framework import serializers
from .models import PredictionHistory


class CarInsuranceSerializer(serializers.Serializer):
    driver_age = serializers.IntegerField()
    driving_experience = serializers.IntegerField()
    annual_mileage = serializers.IntegerField()
    car_mfg_year = serializers.IntegerField()
    prv_accident = serializers.IntegerField()

    def validate_driver_age(self, value):
        if value < 18:
            raise serializers.ValidationError("Driver must be 18 years old.")
        return value
    

class HealthInsuranceSerializer(serializers.Serializer):
    age = serializers.IntegerField()
    height = serializers.FloatField()
    weight = serializers.FloatField()
    has_diabetes = serializers.BooleanField()
    has_pressure_issue = serializers.BooleanField()
    any_bodytransplant = serializers.BooleanField()
    any_chronic_disease = serializers.BooleanField()
    any_allergies = serializers.BooleanField()
    history_of_cancer_in_family = serializers.BooleanField()
    no_of_major_surgery = serializers.IntegerField()

class PredictionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictionHistory
        fields = ['id', 'input_data', 'insurance_type', 'predicted_premium', 'created_at']