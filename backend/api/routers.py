from django.urls import path

from api.mixed_router import APIRouter
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
    {
        "route": "api/verify/",
        "view": SignupView.as_view(),
        "name": "invite",
    },

]

# Normal router setup, including list and registering ViewSets
router = APIRouter(singleViews=singleViews)

router.register(r"api/company_domains", AvailableCompanyDomainsViewSet)
router.register(r"api/associations", AssociationsViewSet)
router.register(r"api/auth_users", AuthUserViewSet)
router.register(r"api/candidates", CandidatesViewSet)
router.register(r"api/cantons", CantonsViewSet)
router.register(r"api/countries", CountriesViewSet)
router.register(r"api/invitations", InvitationsViewSet)
router.register(r"api/languages", LanguagesViewSet)
router.register(r"api/languages_proficiencies", LanguagesProficiencyViewSet)
router.register(r"api/personalities", PersonalitiesViewSet)
router.register(r"api/skills", SkillsViewSet)
router.register(r"api/softskills", SoftSkillsViewSet)
router.register(r"api/status", StatusViewSet)
router.register(r"api/values", ListValuesViewSet)
router.register(r"api/work_models", WorkModelsViewSet)
router.register(r"api/work_permits", WorkPermitsViewSet)
router.register(r"api/files", FileViewSet)
