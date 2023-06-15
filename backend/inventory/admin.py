from django.contrib import admin
from .models import Inventory
from .models import Material
from .models import InventoryOperations

# Register your models here.
admin.site.register(Inventory)
admin.site.register(Material)
admin.site.register(InventoryOperations)
