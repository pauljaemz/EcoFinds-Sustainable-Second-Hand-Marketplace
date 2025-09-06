from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        user = self.request.user
        if getattr(user, "role", None) != "seller":
            raise PermissionDenied("Only sellers can create products.")
        serializer.save(seller=user)

    @action(
        detail=False, methods=["get"], permission_classes=[permissions.IsAuthenticated]
    )
    def by_seller(self, request):
        """
        List all products grouped by seller for buyers.
        """
        products = Product.objects.filter(is_active=True)
        sellers = {}
        for product in products:
            seller_id = product.seller.id
            seller_name = f"{product.seller.first_name} {product.seller.last_name}"
            if seller_id not in sellers:
                sellers[seller_id] = {
                    "seller_id": seller_id,
                    "seller_name": seller_name,
                    "products": [],
                }
            sellers[seller_id]["products"].append(ProductSerializer(product).data)
        return Response(list(sellers.values()))
