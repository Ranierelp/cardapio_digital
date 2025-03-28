from django.shortcuts import render
from rest_framework import viewsets
from product.models import Product
from product.serializers.product import ProductSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=False, methods=['get'])
    def list_products_by_category(self, request):
        category = request.query_params.get('category')
        products = Product.objects.filter(category__name=category)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def list_products_by_name(self, request):
        name = request.query_params.get('name')
        products = Product.objects.filter(name=name)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def list_products_by_range_price(self, request):
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')

        if min_price is None or max_price is None:
            return Response(
                {"error": "Você deve fornecer os parâmetros 'min_price' e 'max_price'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            min_price = float(min_price)
            max_price = float(max_price)
        except ValueError:
            return Response(
                {"error": "Os valores de 'min_price' e 'max_price' devem ser números."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if min_price > max_price:
            return Response(
                {"error": "'min_price' não pode ser maior que 'max_price'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        products = Product.objects.filter(price__gte=min_price, price__lte=max_price)
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['put'])
    def update_product(self, request):
        product_id = request.data.get('id')
        if not product_id:
            return Response(
                {"error": "Você deve fornecer o parâmetro 'id'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            product = Product.objects.get(id=product_id)
            serializer = ProductSerializer(product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response(
                {"error": "Produto não encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['post'])
    def delete_product(self, request):
        product_id = request.data.get('id')
        if not product_id:
            return Response(
                {"error": "Você deve fornecer o parâmetro 'id'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            product = Product.objects.get(id=product_id)
            product.delete()
            return Response({"message": "Produto deletado com sucesso."}, status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response(
                {"error": "Produto não encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )
