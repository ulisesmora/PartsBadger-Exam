from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.contrib.auth.models import User
# Create your models here.


class Material(models.Model):
    name = models.CharField(null=False, blank=False)
    quantity = models.FloatField(null=False, blank=False)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    

class  Inventory(models.Model):
    name = models.CharField(null=False, blank=False)
    description = models.CharField(null=False, blank=False)
    quantity = models.IntegerField(null=False, blank=False)
    sku = models.CharField(max_length=12,null=False, blank=False, unique=True)
    created = models.DateTimeField(default=timezone.now,null=False, blank=True)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=True)
    material = models.ForeignKey(Material, on_delete=models.CASCADE, related_name='materials')

    def __str__(self):
        return self.name    
    
class InventoryOperations(models.Model):
    class OperationInventory(models.TextChoices):
        ADDINVENTORI = "ADDINVENTORY", 
        SUBTRACTIVENTORI = "SUBTRACTINVENTORY",
        ADDMATERIAL = "ADDMATERIAL",
        SUBTRACTMATERIAL = "SUBTRACTMATERIAL"


    operation = models.CharField(OperationInventory.choices,null=False, blank=False)
    quantity = models.FloatField(null=False, blank=False)
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE, related_name='InventoryOperation', null=True, blank=True)
    material = models.ForeignKey(Material, on_delete=models.CASCADE, related_name='MaterialOperation', null=True, blank=True)
    created = models.DateTimeField(default=timezone.now,null=True, blank=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE, related_name="UserOperation", null=False, blank=False, default=1)

    def __str__(self):
        return self.operation    

