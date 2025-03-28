from rest_framework import serializers
from category.models import Category
from common.validations import validate_empty_or_null

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def validate(self, data):
        validate_empty_or_null(data)
        return data

    def validate_name(self, name):
        if Category.objects.filter(name=name).exists():
            raise serializers.ValidationError("Já existe uma categoria com este nome.")
        return name
