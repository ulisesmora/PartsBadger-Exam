from rest_framework import viewsets, serializers
from .serializer import MaterialSerializer, InventorySerializer, OperationsSerializer
from .models import Material, Inventory, InventoryOperations
from rest_framework.exceptions import ValidationError
from django.db.models import Prefetch
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializer import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


# Create your views here.
class MaterialView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = MaterialSerializer
    queryset = Material.objects.all()
    authentication_classes = [JWTAuthentication]


class InventoryView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = InventorySerializer
    queryset = Inventory.objects.all()
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        user = self.request.user
        queryset = super().get_queryset()
        queryset = queryset.filter(user=user)
        queryset = queryset.prefetch_related('material')
        queryset = queryset.prefetch_related('user')
        return queryset
    
    def create(self, request, *args, **kwargs):
        user = self.request.user;
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save(user=user)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    

class OperationView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = OperationsSerializer
    queryset = InventoryOperations.objects.all()
    authentication_classes = [JWTAuthentication]
    http_method_names = ['get', 'post', 'head']

    
    def get_queryset(self):
        user = self.request.user
        queryset = super().get_queryset().filter(user=user)
        return queryset

    def get_serializer_class(self):
        if self.action == 'create':
            return MyCreateSerializer
        return super().get_serializer_class()
    

    
class MyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryOperations
        fields = '__all__'    

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user;
        if(validated_data['operation'] == InventoryOperations.OperationInventory.ADDINVENTORI or validated_data['operation'] == InventoryOperations.OperationInventory.SUBTRACTIVENTORI):
            if(validated_data['inventory'] != None):
                item = Inventory.objects.get(name = validated_data['inventory'])
                if(item.user != user):
                    raise ValidationError("No valid Change for your user")
                if(validated_data['operation'] == InventoryOperations.OperationInventory.ADDINVENTORI):
                    item.quantity += validated_data['quantity']
                    item.save()
                else:
                    if(float(validated_data['quantity']) > item.quantity  ):
                        raise ValidationError("Insuficient Stock")
                    item.quantity -= validated_data['quantity']
                    item.save()    
        # Example: Create a new instance of your model
        instance = InventoryOperations.objects.create(
            operation=validated_data['operation'],
            quantity=validated_data['quantity'],
            inventory=validated_data['inventory'],
            user=user,
            # Set other fields as needed
        )

        # Perform additional actions if necessary
        # ...

        return instance


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            response_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()
        if user is None or not user.check_password(password):
            return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response(response_data, status=status.HTTP_200_OK)