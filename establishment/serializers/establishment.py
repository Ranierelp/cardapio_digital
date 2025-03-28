from rest_framework import serializers
from establishment.models import Establishment
from common.validations import validate_empty_or_null
from django.contrib.auth import authenticate


class EstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = '__all__'



class EstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = ['id', 'code', 'name', 'email', 'phone', 'photo', 'cnpj', 'created_at', 'updated_at', 'is_active']
        read_only_fields = ['id', 'code', 'created_at', 'updated_at', 'is_active']

    def validate(self, data):
        validate_empty_or_null(data)
        return data

    # def create(self, validated_data):
    #     password = validated_data.pop('password', None)
    #     establishment = Establishment(**validated_data)
    #     if password:
    #         establishment.set_password(password)
    #     establishment.save()
    #     return establishment

class EstablishmentLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError("Credenciais inválidas.")
        return user
