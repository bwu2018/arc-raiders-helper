from django.http import HttpResponse
from rest_framework import viewsets

from .models import Condition
from .serializers import ConditionSerializer


class ConditionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Condition.objects.all()
    serializer_class = ConditionSerializer


def index(request):
    return HttpResponse("Hello, world")
