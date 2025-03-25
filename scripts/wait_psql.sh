#!/bin/sh
echo "🔄 Esperando pelo PostgreSQL..."
while ! nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
  echo "⏳ PostgreSQL ainda não está pronto ($POSTGRES_HOST:$POSTGRES_PORT)..."
  sleep 2
done
echo "✅ PostgreSQL está pronto! ($POSTGRES_HOST:$POSTGRES_PORT)"
