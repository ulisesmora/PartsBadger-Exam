from rest_framework import serializers
from .models import Material
from .models import Inventory
from .models import InventoryOperations
from django.contrib.auth.models import User


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'

    def update(self, instance, validated_data):
        # Block the update of a specific parameter
        validated_data.pop('quantity', None)    
        return super().update(instance, validated_data)

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

    def update(self, instance, validated_data):
        # Block the update of a specific parameter
        validated_data.pop('quantity', None)        
        return super().update(instance, validated_data)


class OperationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryOperations
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user
        
