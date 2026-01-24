from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views
from .views import ConditionViewSet

router = DefaultRouter()
router.register(r"conditions", ConditionViewSet)

urlpatterns = [
    path("", views.index, name="index"),
    path("conditions/", include(router.urls)),
]
