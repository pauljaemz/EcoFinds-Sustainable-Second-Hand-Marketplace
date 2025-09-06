"""
WSGI config for ecofinds project.

This module contains the WSGI application used by Django's development server
and any WSGI-compatible web server. It should expose a module-level variable
named `application`.

For more information on this file, see
https://docs.djangoproject.com/en/stable/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecofinds.settings')

application = get_wsgi_application()
