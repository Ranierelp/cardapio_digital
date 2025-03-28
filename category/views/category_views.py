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

    @action(detail=False, methods=['get'])
    def get_category_by_name(self, request):
        category_name = request.query_params.get('name')

        if not category_name:
            return Response(
                {"error": "Você deve fornecer o parâmetro 'id'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            category = Category.objects.get(name=category_name)
            serializer = CategorySerializer(category)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response(
                {"error": "Categoria não encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['put'])
    def update_category_by_name(self, request):
        category_name = request.data.get('name')

        if not category_name:
            return Response(
                {"error": "Você deve fornecer os parâmetros 'name'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            category = Category.objects.get(name=category_name)
            serializer = CategorySerializer(category, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response(
                {"error": "Categoria não encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['post'])
    def delete_category(self, request):
        category_id = request.data.get('id')

        if not category_id:
            return Response(
                {"error": "Você deve fornecer o parâmetro 'id'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            category = Category.objects.get(id=category_id)
            category.delete()
            return Response({"message": "Categoria excluída com sucesso."}, status=status.HTTP_204_NO_CONTENT)
        except Category.DoesNotExist:
            return Response(
                {"error": "Categoria não encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )
