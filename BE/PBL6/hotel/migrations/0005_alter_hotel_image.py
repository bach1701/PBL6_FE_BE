# Generated by Django 5.1 on 2024-09-22 05:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotel', '0004_alter_hotel_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotel',
            name='image',
            field=models.FileField(upload_to='hotel_gallery'),
        ),
    ]
