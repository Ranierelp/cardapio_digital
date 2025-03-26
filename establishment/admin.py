from django.contrib import admin
from .models import Establishment

@admin.register(Establishment)
class EstablishmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'cnpj', 'is_active', 'created_at')
    search_fields = ('name', 'email', 'phone', 'cnpj')
    list_filter = ('created_at', 'is_active')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at', 'deleted_at')
    list_editable = ('is_active',)
    actions = ['ativar_estabelecimentos', 'desativar_estabelecimentos']

    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'email', 'phone', 'photo', 'cnpj', 'code')
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

    @admin.action(description="Ativar estabelecimentos selecionados")
    def ativar_estabelecimentos(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description="Desativar estabelecimentos selecionados")
    def desativar_estabelecimentos(self, request, queryset):
        queryset.update(is_active=False)

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_active=True)
