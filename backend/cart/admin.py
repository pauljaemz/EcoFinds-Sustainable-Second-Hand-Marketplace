from django.contrib import admin
from .models import Cart, CartItem


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "buyer", "created_at", "updated_at")
    search_fields = ("buyer__email",)
    list_filter = ("created_at",)


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("id", "cart", "product", "quantity", "added_at")
    search_fields = ("cart__buyer__email", "product__name")
    list_filter = ("added_at",)
