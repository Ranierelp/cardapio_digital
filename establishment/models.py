import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

class BaseModelQuerySet(models.QuerySet):
    def delete(self):
        self.update(deleted_at=timezone.now(), is_active=False)
        super().delete()

class BaseManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted_at__isnull=True, is_active=True)

class BaseModel(models.Model):
    created_at = models.DateTimeField('Created At', auto_now_add=True)
    updated_at = models.DateTimeField('Updated At', auto_now=True)
    deleted_at = models.DateTimeField('Deleted At', null=True, blank=True)
    is_active = models.BooleanField('Is Active', default=True)

    objects = BaseManager()

    def soft_delete(self):
        self.deleted_at = timezone.now()
        self.is_active = False
        self.save()

    def hard_delete(self):
        super().delete()

    def recover(self):
        self.deleted_at = None
        self.is_active = True
        self.save()

    class Meta:
        abstract = True

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_staff', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if not extra_fields['is_superuser'] or not extra_fields['is_staff']:
            raise ValueError('Superuser must have is_staff=True and is_superuser=True')

        return self._create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin, BaseModel):
    code = models.UUIDField("Código uuid4", default=uuid.uuid4, editable=False)
    name = models.CharField('Name', max_length=255)
    email = models.EmailField('Email', unique=True)
    phone = models.CharField('Phone', max_length=20)
    photo = models.ImageField('Photo', upload_to='img_profile', null=True, blank=True)
    is_staff = models.BooleanField('Is Staff', default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone']

    objects = UserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

class Establishment(CustomUser):
    cnpj = models.CharField('CNPJ', max_length=14, unique=True)

    class Meta:
        verbose_name = "Establishment"
        verbose_name_plural = "Establishments"
