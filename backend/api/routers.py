from api.mixed_router import APIRouter
from django.urls import path
from api.views import *

# Define list - replace my_api_view with any view class that subclasses DRF's APIView (including Login, Logout views e.g. django-rest-knox)
singleViews = [
    {
        "route": "api/login/",
        "view": LoginView.as_view(),
        "name": "login",
    },
    {
        "route": "api/signup/",
        "view": SignupView.as_view(),
        "name": "signup",
    },
    {
        "route": "api/recover/",
        "view": RecoverView.as_view(),
        "name": "recover",
    },
    {
        "route": "api/logout/",
        "view": LogoutView.as_view(),
        "name": "logout",
    },
    {
        "route": "api/invite/",
        "view": InviteView.as_view(),
        "name": "invite",
    },
]

# Normal router setup, including list and registering ViewSets
router = APIRouter(singleViews=singleViews)

router.register(r"api/auth_users", AuthUserViewSet)
router.register(r"api/skills", SkillsViewSet)
router.register(r"api/invitations", InvitationsViewSet)
router.register(r"api/associations", AssociationsViewSet)
router.register(r"api/candidates", CandidatesViewSet)
router.register(r"api/files", FileViewSet)
