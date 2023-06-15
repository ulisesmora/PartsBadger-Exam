# Generated by Django 4.2.2 on 2023-06-13 14:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('inventory', '0005_remove_material_sku'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventory',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='UserInventory', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='material',
            name='quantity',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='inventory',
            name='material',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='MaterialInventory', to='inventory.material'),
        ),
        migrations.CreateModel(
            name='InventoryOperations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('operation', models.CharField(default='ADDINVENTORY', verbose_name=[('ADDINVENTORY', 'Addinventori'), ('SUBTRACTINVENTORY', 'Subtractiventori'), ('ADDMATERIAL', 'Addmaterial'), ('SUBTRACTMATERIAL', 'Subtract')])),
                ('quantity', models.FloatField(default=0)),
                ('inventory', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='InventoryOperation', to='inventory.inventory')),
                ('material', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='MaterialOperation', to='inventory.material')),
            ],
        ),
    ]
