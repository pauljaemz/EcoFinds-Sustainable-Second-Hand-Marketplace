from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    variations = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "seller",
            "name",
            "description",
            "brand",
            "category",
            "price",
            "quantity",
            "image",
            "color",
            "size",
            "sku",
            "is_active",
            "created_at",
            "updated_at",
            "parent_product",
            "variations",
        ]
from rest_framework import serializers
from .models import Product

class ProductBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'brand', 'category']