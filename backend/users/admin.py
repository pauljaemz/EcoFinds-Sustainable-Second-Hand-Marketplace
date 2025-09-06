from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin
from django.forms import EmailInput

class CustomUserAdminConfig(UserAdmin):
    model = CustomUser
    search_fields = ('email', 'first_name', 'last_name')
    list_filter = ('is_active', 'is_staff', 'date_joined', 'role')
    ordering = ('role','-date_joined',)
    list_display = ('first_name','email','role', 'date_joined', 'is_active', 'is_staff')

    fieldsets = (
        (None, {'fields': ( 'first_name','last_name','email', 'password',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'role','is_superuser',)}),
        ('Important dates', {'fields': ('date_joined','last_login','password_last_changed',)}),
        ('Group Permissions', {'fields': ('groups', 'user_permissions',)}),
    )

    formfield_overrides = {
        model.email: {'widget': EmailInput(attrs={'placeholder': 'user@example.com'})},
        
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('first_name', 'last_name', 'email', 'password1', 'password2')}
        ),
    )
    readonly_fields = ('last_login', 'date_joined','role','is_superuser','password_last_changed',)

# Register your models here.
admin.site.register(CustomUser, CustomUserAdminConfig)