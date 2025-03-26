from rest_framework import serializers

def validate_empty_or_null(data: dict) -> bool:
    """Verifica se algum campo do dicionário está vazio ou nulo.

    Args:
        data (dict): Dados a serem validados.

    Raises:
        serializers.ValidationError: Mensagem de erro indicando qual campo está vazio ou nulo.

    Returns:
        bool: True se todos os campos estiverem preenchidos, caso contrário, False.
    """
    for field, value in data.items():
        if value is None or (isinstance(value, str) and value.strip() == ''):
            raise serializers.ValidationError(
                {'error': f'Verifique se todos os campos foram preenchidos.'}
            )
    return True
