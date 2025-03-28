from rest_framework.routers import DefaultRouter
from establishment.views.establishment_views import EstablishmentViewSet

router_establishement = DefaultRouter()
router_establishement.register('estabelecimento', EstablishmentViewSet)

urlpatterns = router_establishement.urls
