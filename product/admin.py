from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'quantity', 'category', 'is_active', 'created_at')
    search_fields = ('name', 'category__name')
    list_filter = ('created_at', 'is_active', 'category')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at', 'deleted_at')
    list_editable = ('is_active',)
    actions = ['ativar_produtos', 'desativar_produtos']

    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'description', 'price', 'quantity', 'photo', 'category', 'code')
        }),
        ('Status', {
            'fields': ('is_active', 'deleted_at'),
            'classes': ('collapse',),
        }),
        ('Datas', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    @admin.action(description="Ativar produtos selecionados")
    def ativar_produtos(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description="Desativar produtos selecionados")
    def desativar_produtos(self, request, queryset):
        queryset.update(is_active=False)

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_active=True)
