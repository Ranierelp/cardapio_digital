FROM python:3.11

# Instalar netcat para testar conexão com PostgreSQL
RUN apt-get update && apt-get install -y netcat-openbsd

# Variáveis de ambiente
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Criar diretório de trabalho
WORKDIR /code

# Copiar e instalar dependências
COPY requirements.txt /code/
RUN pip install --upgrade pip && \
    pip install -r /code/requirements.txt

ENV PATH="/scripts:$PATH"

# Copiar scripts e dar permissão de execução
COPY scripts /scripts
RUN chmod -R +x /scripts

# Copiar código da aplicação
COPY . /code

# Expor a porta 8001
EXPOSE 8001

# Definir comando padrão
CMD ["commands.sh"]
