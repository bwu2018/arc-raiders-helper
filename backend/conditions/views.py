from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Condition
from .serializers import ConditionSerializer, GroupedConditionsSerializer


class ConditionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Condition.objects.all()
    serializer_class = ConditionSerializer


class ConditionsByMapView(APIView):
    def get(self, request):
        queryset = Condition.objects.all()
        serializer = GroupedConditionsSerializer(queryset)
        return Response(serializer.data)
