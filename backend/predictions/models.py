from django.db import models
from users.models import CustomUser

# Model to store user's prediction history
class PredictionHistory(models.Model):
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE, related_name = 'predictions')
    input_data = models.JSONField(null = False, blank = False)
    insurance_type = models.CharField(max_length = 20, blank = False)
    predicted_premium = models.FloatField(blank = False)
    created_at = models.DateField(auto_now_add = True)