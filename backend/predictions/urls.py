from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.DashboardInfo, name = 'dashboard'),
    path('history/', views.UserPredictionHistory, name = 'history'),
    path('delete/<int:pk>/', views.DeletePrediction, name = 'delete_prediction'),
    path('health_insurance/', views.HealthInsurancePrediction, name = 'health_insurance'),
    path('car_insurance/', views.CarInsurancePrediction, name = 'car_insurance')
]