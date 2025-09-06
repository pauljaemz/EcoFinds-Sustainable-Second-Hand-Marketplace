from django.urls import path
from .views import CartListView, CartDetailView, CartAddView, CartRemoveView

urlpatterns = [
    path('cart/', CartListView.as_view(), name='cart-list'),
    path('cart/add/', CartAddView.as_view(), name='cart-add'),
    path('cart/<int:pk>/', CartDetailView.as_view(), name='cart-detail'),
    path('cart/remove/<int:pk>/', CartRemoveView.as_view(), name='cart-remove'),
]