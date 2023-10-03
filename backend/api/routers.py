from rest_framework import routers
from api.views import *

router = routers.DefaultRouter()
router.register(r"api/auth_users", AuthUserViewSet)
router.register(r"api/skills", SkillsViewSet)
router.register(r"api/invitations", InvitationsViewSet)
router.register(r"api/associations", AssociationsViewSet)
