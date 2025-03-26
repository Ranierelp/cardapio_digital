from django.contrib import admin
from .models import Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'created_at')
    search_fields = ('name',)
    list_filter = ('created_at', 'is_active')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at', 'deleted_at')
    list_editable = ('is_active',)
    actions = ['ativar_categorias', 'desativar_categorias']

    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'description', 'photo')
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

    @admin.action(description="Ativar categorias selecionadas")
    def ativar_categorias(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description="Desativar categorias selecionadas")
    def desativar_categorias(self, request, queryset):
        queryset.update(is_active=False)

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_active=True)
