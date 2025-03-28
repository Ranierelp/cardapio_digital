from django.shortcuts import render
from rest_framework import viewsets
from category.serializers.category import CategorySerializer
from category.models import Category
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
