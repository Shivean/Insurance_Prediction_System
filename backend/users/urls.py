from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name = 'login'),
    path('logout/', views.user_logout, name = 'logout'),
    path('profile/', views.profile, name = 'profile'),
    path('profile/update/', views.update_profile, name = 'update_profile'),
    path('profile/change_password/', views.change_password, name = 'change_password')
]