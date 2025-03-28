from rest_framework.routers import DefaultRouter
from product.views.product_views import ProductViewSet

router_product = DefaultRouter()
router_product.register('produto', ProductViewSet)

urlpatterns = router_product.urls
