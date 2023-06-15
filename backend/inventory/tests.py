from django.test import TestCase
# Create your tests here.
from django.contrib.auth.models import User
from .models import Material, Inventory, InventoryOperations
from .serializers import MaterialSerializer, InventorySerializer, OperationsSerializer, UserSerializer



class MaterialSerializerTestCase(TestCase):
    def setUp(self):
        self.material = Material.objects.create(name='Test Material', quantity=10)

    def test_update_method(self):
        serializer = MaterialSerializer(instance=self.material, data={'name': 'Updated Material'})
        serializer.is_valid()
        serializer.save()

        self.material.refresh_from_db()
        self.assertEqual(self.material.name, 'Updated Material')
        self.assertEqual(self.material.quantity, 10)

class InventorySerializerTestCase(TestCase):
    def setUp(self):
        self.inventory = Inventory.objects.create(name='Test Inventory', quantity=5)

    def test_update_method(self):
        serializer = InventorySerializer(instance=self.inventory, data={'name': 'Updated Inventory'})
        serializer.is_valid()
        serializer.save()

        self.inventory.refresh_from_db()
        self.assertEqual(self.inventory.name, 'Updated Inventory')
        self.assertEqual(self.inventory.quantity, 5)

class OperationsSerializerTestCase(TestCase):
    def setUp(self):
        self.operation = InventoryOperations.objects.create(description='Test Operation')

    def test_serializer_fields(self):
        serializer = OperationsSerializer(instance=self.operation)

        self.assertEqual(set(serializer.data.keys()), {'id', 'description', 'created_at'})

class UserSerializerTestCase(TestCase):
    def test_create_method(self):
        serializer = UserSerializer(data={'username': 'testuser', 'password': 'testpassword', 'email': 'test@example.com'})
        serializer.is_valid()
        user = serializer.save()

        self.assertEqual(user.username, 'testuser')
        self.assertNotEqual(user.password, 'testpassword')  # Password should be hashed
        self.assertEqual(user.email, 'test@example.com')

        # Additional assertions or tests for user creation can be added
