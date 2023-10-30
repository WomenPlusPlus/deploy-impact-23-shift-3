from rest_framework.test import APIRequestFactory
from api.authentication_services import get_user_type
from api.views import (
    CandidatesViewSet,
    LoginView,
    CompaniesViewSet,
    SkillsViewSet,
    SoftSkillsViewSet,
)
from django.test import TestCase
import django

django.setup()

class TestAuthentication(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_login(self):
        users = [
            {
                "email": "company@company.com",
                "password": "Company123.123",
                "role": "company_user",
                "id": 1,
            },
            {
                "email": "candidate@candidate.com",
                "password": "Candidate123.123",
                "role": "candidate",
                "id": 1,
            },
            {
                "email": "association@association.com",
                "password": "Association123.123",
                "role": "association_user",
                "id": 1,
            },
        ]

        login_page = LoginView.as_view()
        factory = APIRequestFactory()

        for user in users:
            request = factory.post("/login/", {**user})
            response = login_page(request)

            assert response.data["role"] == user["role"]
            assert "access_token" in response.data.keys()
            assert "refresh_token" in response.data.keys()

    def test_create_hard_skill(self):
        factory = APIRequestFactory()
        request = factory.post(
            "/skills/1/",
            {
                "skill_name": "first skill",
            },
        )

        view = SkillsViewSet.as_view({"post": "create"})
        response = view(request)

        assert response.status_code == 201

        return response.data["skill_id"]

    def test_create_soft_skill(self):
        factory = APIRequestFactory()
        request = factory.post(
            "/softskills/1/",
            {
                "soft_skill_name": "first soft skill",
            },
        )

        view = SoftSkillsViewSet.as_view({"post": "create"})
        response = view(request)

        assert response.status_code == 201

        return response.data["soft_skill_id"]

    def test_candidates_view(self):
        factory = APIRequestFactory()
        request = factory.get("/api/candidates/")

        view = CandidatesViewSet.as_view({"get": "list"})
        response = view(request)

        assert response.status_code == 200

    def test_comapnies_view(self):
        factory = APIRequestFactory()
        request = factory.get("/api/companies/")

        view = CompaniesViewSet.as_view({"get": "list"})
        response = view(request)

        assert response.status_code == 200
