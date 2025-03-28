from rest_framework.routers import DefaultRouter
from category.views.category_views import CategoryViewSet

router_category = DefaultRouter()
router_category.register('categoria', CategoryViewSet)

urlpatterns = router_category.urls
