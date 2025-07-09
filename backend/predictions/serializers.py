from rest_framework import serializers
from .models import PredictionHistory


class CarInsuranceSerializer(serializers.ModelSerializer):
    driver_age = serializers.IntegerField()
    driving_experience = serializers.IntegerField()
    annual_mileage = serializers.IntegerField()
    car_mfg_year = serializers.IntegerField()
    prv_accident = serializers.IntegerField()

    class Meta:
        model = PredictionHistory
        fields = '__all__'


class HealthInsuranceSerializer(serializers.ModelSerializer):
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

    class Meta:
        model = PredictionHistory
        fields = '__all__'
