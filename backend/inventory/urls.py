from django.urls import path, include
from rest_framework import routers
from .views import MaterialView, InventoryView, OperationView, RegisterView, LoginView
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'material', MaterialView, 'material')
router.register(r'inventory', InventoryView, 'inventory')
router.register(r'operations', OperationView, 'operations')


urlpatterns = [
    path("inventory", include(router.urls) ),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("docs/", include_docs_urls(title="Inventory API"))
]