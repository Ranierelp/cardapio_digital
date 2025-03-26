import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser

class Base(models.Model):
    code = models.UUIDField("Código uuid4", default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField('Created At', auto_now_add=True)
    updated_at = models.DateTimeField('Updated At', auto_now=True)
    deleted_at = models.DateTimeField('Deleted At', null=True, blank=True)
    is_active = models.BooleanField('Is Active', default=True)

class Establishment(AbstractBaseUser, Base):
    name = models.CharField('Name', max_length=255)
    email = models.EmailField('Email', unique=True)
    phone = models.CharField('Phone', max_length=20)
    photo = models.ImageField('Photo', upload_to='img_profile', null=True, blank=True)
    cnpj = models.CharField('CNPJ', max_length=14, unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone']

    def soft_delete(self):
        self.deleted_at = timezone.now()
        self.is_active = False
        self.save()
