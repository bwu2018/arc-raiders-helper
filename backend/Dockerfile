ARG PYTHON_VERSION=3.12.3
FROM python:${PYTHON_VERSION}-slim as base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first
COPY requirements.txt .

# Install Python dependencies
RUN python -m pip install --no-cache-dir -r requirements.txt

# Copy the source code
COPY . .

# Create staticfiles directory
RUN mkdir -p /app/staticfiles && \
    chmod -R 777 /app

# Use production settings
ENV DJANGO_SETTINGS_MODULE=config.settings_prod

# Expose the port
EXPOSE 8000

# Run migrations, seed DB, then start gunicorn
CMD ["sh", "-c", "\
  python manage.py migrate --noinput && \
  python manage.py collectstatic --noinput && \
  python manage.py get_events_schedule && \
  gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3 \
"]