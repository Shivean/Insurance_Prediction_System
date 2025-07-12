from django.urls import path
# from views import HealthInsurancePrediction, CarInsurancePrediction
from . import views

urlpatterns = [
    path('dashboard/', views.DashboardInfo, name = 'dashboard'),
    path('history/', views.UserPredictionHistory, name = 'history'),
    path('health_insurance/', views.HealthInsurancePrediction, name = 'health_insurance'),
    path('car_insurance/', views.CarInsurancePrediction, name = 'car_insurance')
]