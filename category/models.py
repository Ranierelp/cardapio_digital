import uuid
from django.db import models

class Base(models.Model):
    code = models.UUIDField("Código uuid4", default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField('Created At', auto_now_add=True)
    updated_at = models.DateTimeField('Updated At', auto_now=True)
    deleted_at = models.DateTimeField('Deleted At', null=True, blank=True)
    is_active = models.BooleanField('Is Active', default=True)

class Category(Base):
    name = models.CharField('Name', max_length=255)
    description = models.TextField('Description', null=True, blank=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name
