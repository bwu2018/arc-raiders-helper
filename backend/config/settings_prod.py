import os

from .settings import *

# SECURITY SETTINGS
DEBUG = False
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")

# Update ALLOWED_HOSTS with your domain or EC2 public IP
ALLOWED_HOSTS = [os.environ.get("EC2_IP")]

# CORS Settings - Update with your Amplify frontend URL
CORS_ALLOWED_ORIGINS = [
    "https://main.d2bz6x45i06kud.amplifyapp.com",
]

CSRF_TRUSTED_ORIGINS = [
    "https://main.d2bz6x45i06kud.amplifyapp.com",
]

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATIC_URL = "/static/"

# Database - Consider PostgreSQL for production
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': os.environ.get('DB_NAME', 'arcraiders'),
#         'USER': os.environ.get('DB_USER', 'postgres'),
#         'PASSWORD': os.environ.get('DB_PASSWORD'),
#         'HOST': os.environ.get('DB_HOST', 'localhost'),
#         'PORT': os.environ.get('DB_PORT', '5432'),
#     }
# }

# Security headers
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"

# If using HTTPS (recommended)
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
