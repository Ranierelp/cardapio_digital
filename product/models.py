import uuid
from django.db import models
from category.models import Category
from establishment.models import Establishment
class Base(models.Model):
    code = models.UUIDField("Código uuid4", default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField('Created At', auto_now_add=True)
    updated_at = models.DateTimeField('Updated At', auto_now=True)
    deleted_at = models.DateTimeField('Deleted At', null=True, blank=True)
    is_active = models.BooleanField('Is Active', default=True)

class Product(Base):
    name = models.CharField('Name', max_length=255)
    description = models.TextField('Description', null=True, blank=True)
    price = models.DecimalField('Price', max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField('Quantity', null=True, blank=True)
    photo = models.ImageField('Photo', upload_to='products_img', null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    establishment = models.ForeignKey(Establishment, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
