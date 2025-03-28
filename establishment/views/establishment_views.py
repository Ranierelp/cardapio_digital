from django.shortcuts import render
from rest_framework import viewsets
from establishment.models import Establishment
from establishment.serializers.establishment import EstablishmentSerializer, EstablishmentLoginSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, logout

class EstablishmentViewSet(viewsets.ModelViewSet):
    queryset = Establishment.objects.all()
    serializer_class = EstablishmentSerializer

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = EstablishmentLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            # update_last_login(None, user)
            return Response({"message": "Login realizado com sucesso."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        logout(request)
        return Response({"message": "Logout realizado com sucesso."}, status=status.HTTP_200_OK)
