"""
URL configuration for cardapio_digital project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from establishment.urls import router_establishement
from category.urls import router_category
from product.urls import router_product
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router_establishement.urls)),
    path('api/v1/', include(router_category.urls)),
    path('api/v1/', include(router_product.urls)),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
