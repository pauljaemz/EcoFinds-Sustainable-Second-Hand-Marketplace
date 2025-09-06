from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()  # Additional logic can be added here if needed

    def perform_update(self, serializer):
        serializer.save()  # Additional logic can be added here if needed

    def perform_destroy(self, instance):
        instance.delete()  # Additional logic can be added here if needed