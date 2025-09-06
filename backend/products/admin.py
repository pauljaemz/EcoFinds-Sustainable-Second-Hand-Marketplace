from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "seller",
        "sku",
        "price",
        "quantity",
        "is_active",
        "created_at",
    )
    search_fields = ("name", "sku", "brand", "category")
    list_filter = ("is_active", "brand", "category", "seller")
