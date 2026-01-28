"""
Production settings for config project.
"""

import os
from pathlib import Path

from .settings import *  # noqa: F403, F401

# Build paths
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get(
    "DJANGO_SECRET_KEY",
)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Update ALLOWED_HOSTS with your EC2 IP and domain
ALLOWED_HOSTS = [
    "18.224.65.19",
    "localhost",
    "127.0.0.1",
]

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "https://main.d2bz6x45i06kud.amplifyapp.com",
]

CSRF_TRUSTED_ORIGINS = [
    "https://main.d2bz6x45i06kud.amplifyapp.com",
]

# Database - use /tmp directory which is always writable
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": "/tmp/db.sqlite3",  # Store in /tmp instead of /app
    }
}

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATIC_URL = "/static/"

# Security headers
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"
