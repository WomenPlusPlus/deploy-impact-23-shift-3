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
    {
        "route": "api/company_jobs/<int:company_id>",
        "view": CompanyJobsViewSet.as_view({"get": "list"}),
        "name": "companyJobs",
    },
]

# Normal router setup, including list and registering ViewSets
router = APIRouter(singleViews=singleViews)

router.register(r"company_domains", AvailableCompanyDomainsViewSet)
router.register(r"associations", AssociationsViewSet)
router.register(r"auth_users", AuthUserViewSet)
router.register(r"candidates", CandidatesViewSet)
router.register(r"cantons", CantonsViewSet)
router.register(r"companies", CompaniesViewSet)
router.register(r"cantons", CantonsViewSet)
router.register(r"countries", CountriesViewSet)
router.register(r"invitations", InvitationsViewSet)
router.register(r"jobs", JobsViewSet)
router.register(r"languages", LanguagesViewSet)
router.register(r"languages_proficiencies", LanguagesProficiencyViewSet)
router.register(r"personalities", PersonalitiesViewSet)
router.register(r"skills", SkillsViewSet)
router.register(r"softskills", SoftSkillsViewSet)
router.register(r"status", StatusViewSet)
router.register(r"values", ListValuesViewSet)
router.register(r"work_models", WorkModelsViewSet)
router.register(r"work_permits", WorkPermitsViewSet)
router.register(r"files", FileViewSet)
