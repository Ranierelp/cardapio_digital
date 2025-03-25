#!/bin/sh

# Aplicar migrações do Django
echo "🔄 Aplicando migrações..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput
echo "✅ Migrações aplicadas com sucesso!"
