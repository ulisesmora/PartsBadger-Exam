# Generated by Django 4.2.2 on 2023-06-13 16:38

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0008_alter_inventoryoperations_inventory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventory',
            name='created',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
    ]
