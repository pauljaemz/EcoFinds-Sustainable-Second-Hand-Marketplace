from django.contrib import admin
from .models import Order, OrderItem


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "buyer",
        "created_at",
        "total_amount",
        "status",
        "payment_status",
    )
    search_fields = ("buyer__email", "shipping_address", "billing_address")
    list_filter = ("status", "payment_status", "created_at")


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "product", "quantity", "price")
    search_fields = ("order__buyer__email", "product__name")
    list_filter = ("order",)
