from django.db import models
from django.contrib.auth.models import AbstractUser


# Model for user registration
class CustomUser(AbstractUser):
    email = models.EmailField(unique = True)
    phone_number = models.CharField(max_length = 20)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']



