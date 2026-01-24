from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ConditionsByMapView, ConditionViewSet

router = DefaultRouter()
router.register(r"conditions", ConditionViewSet)

urlpatterns = [
    # path("", views.index, name="index"),
    path("api/", include(router.urls)),
    path(
        "api/conditions_by_map/",
        ConditionsByMapView.as_view(),
        name="conditions_by_map",
    ),
]
