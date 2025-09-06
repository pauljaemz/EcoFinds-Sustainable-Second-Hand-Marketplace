from django.urls import path
from . import views as Login_View

# Login/urls.py
# with base url localhost:8000/account/ or (http://127.0.0.1:8000/account/)

urlpatterns = [
    path('register/user', Login_View.UserRegisterViews.as_view(), name='register-user'),
    path('load_users/', Login_View.LoadUserView.as_view(), name='loadusers'),
    path('logout/', Login_View.LogoutView.as_view(), name='logout'),
    path('token/', Login_View.CustomTokenObtainPairView.as_view(), name='TokenObtainPair'),
    path('token/refresh/', Login_View.CustomTokenRefreshView.as_view(), name='TokenRefresh'),
    path('token/verify/', Login_View.CustomTokenVerifyView.as_view(), name='TokenVerify'),
    path('password-reset/', Login_View.PasswordResetRequestView.as_view(), name='api_password_reset_request'),
    path('password-reset/confirm/', Login_View.PasswordResetConfirmView.as_view(), name='api_password_reset_confirm'),
]