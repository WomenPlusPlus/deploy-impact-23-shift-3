from rest_framework import routers
from api.views import *

router = routers.DefaultRouter()
router.register(r"api/users", UserViewSet)
router.register(r"api/skills", SkillsViewSet)
router.register(r"api/invitations", InvitationsViewSet)
router.register(r"api/associations", AssociationsViewSet)

# router.register(r"api/refresh_token", RefreshTokenViewSet)
