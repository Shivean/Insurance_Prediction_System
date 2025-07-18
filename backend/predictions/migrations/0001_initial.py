# Generated by Django 5.2.4 on 2025-07-09 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PredictionHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('input_data', models.JSONField()),
                ('insurance_type', models.CharField(max_length=20)),
                ('predicted_premium', models.FloatField()),
                ('created_at', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
