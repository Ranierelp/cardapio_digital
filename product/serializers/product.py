from rest_framework import serializers
from product.models import Product
from common.validations import validate_empty_or_null

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def validate(self, data):
        validate_empty_or_null(data)
        return data
