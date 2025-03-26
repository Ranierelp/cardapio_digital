from rest_framework import serializers
from establishment.models import Establishment
from common.validations import validate_empty_or_null


class EstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = '__all__'

    def validate(self, data):
        validate_empty_or_null(data)
        return data
