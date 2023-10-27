import os
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import mixins
from rest_framework.settings import api_settings
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter
from api import models
from api.authentication_services import IsAssociationUser, IsCandidateUser
import api.views_schemas as views_schemas

import json
from api import serializers as models_serializers
from api.auth_models import AuthUsers
from api import auth_token
from api.models import Associations, CandidatesDocuments
from api.services import (
    apply_supabase_id_to_users_tables_and_apply_metadata,
    authorize_invite,
    gotrue_auth_request,
    update_user_password,
    create_user_in_respective_table,
    register_company_domain,
    is_valid_company_domain,
)

from rest_framework import viewsets, status

POSSIBLE_ROLES = json.loads(os.environ["POSSIBLE_ROLES"])
SUPABASE_SERVICE_ROLE_APIKEY = os.environ["SUPABASE_SERVICE_ROLE_APIKEY"]


class AuthUserViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]

    AuthUsers.objects.using("auth")
    queryset = AuthUsers.objects.all()
    serializer_class = models_serializers.AuthUserSerializer


class CantonsViewSet(viewsets.ModelViewSet):
    queryset = models.Cantons.objects.all()
    serializer_class = models_serializers.CantonsSerializer


class CountriesViewSet(viewsets.ModelViewSet):
    queryset = models.Countries.objects.all()
    serializer_class = models_serializers.CountriesSerializer


class AssociationsViewSet(viewsets.ModelViewSet):
    queryset = models.Associations.objects.all()
    serializer_class = models_serializers.AssociationsSerializer


class LanguagesViewSet(viewsets.ModelViewSet):
    queryset = models.Languages.objects.all()
    serializer_class = models_serializers.LanguagesSerializer

    def list(self, request, *args, **kwargs):
        content = {
            "user": str(request.user),
            "auth": str(request.auth),
        }
        return super().list(request, *args, **kwargs)


class LanguagesProficiencyViewSet(viewsets.ModelViewSet):
    queryset = models.LanguagesProficiency.objects.all()
    serializer_class = models_serializers.LanguagesProficiencySerializer


class InvitationsViewSet(viewsets.ModelViewSet):
    queryset = models.Invitation.objects.all()
    serializer_class = models_serializers.InvitationSerializer


class PersonalitiesViewSet(viewsets.ModelViewSet):
    queryset = models.Personalities.objects.all()
    serializer_class = models_serializers.PersonalitiesSerializer


class SkillsViewSet(viewsets.ModelViewSet):
    queryset = models.Skills.objects.all()
    serializer_class = models_serializers.SkillsSerializer


class SoftSkillsViewSet(viewsets.ModelViewSet):
    queryset = models.SoftSkills.objects.all()
    serializer_class = models_serializers.SoftSkillsSerializer


class StatusViewSet(viewsets.ModelViewSet):
    queryset = models.Status.objects.all()
    serializer_class = models_serializers.StatusSerializer


class ListValuesViewSet(viewsets.ModelViewSet):
    queryset = models.ListValues.objects.all()
    serializer_class = models_serializers.ListValuesSerializer


class WorkModelsViewSet(viewsets.ModelViewSet):
    queryset = models.WorkModels.objects.all()
    serializer_class = models_serializers.WorkModelsSerializer


class WorkPermitsViewSet(viewsets.ModelViewSet):
    queryset = models.WorkPermits.objects.all()
    serializer_class = models_serializers.WorkPermitsSerializer


@extend_schema_view(
    post=extend_schema(**views_schemas.login_view_post),
)
class LoginView(APIView):
    def post(self, request):
        payload, status_code = gotrue_auth_request(request)
        if "error" not in payload:
            payload = auth_token.format_token(payload)
        return Response(payload, status=status_code)


class LogoutView(APIView):
    def post(self, request):
        payload, status_code = gotrue_auth_request(request)
        return Response(payload, status=status_code)


class SignupView(APIView):
    def post(self, request):
        required_fields = ["password", "first_name", "last_name", "email"]

        request_payload = request.data

        # Verify it's a valid request
        if "token" in request_payload.keys():
            try:
                UserSigningUp = AuthUsers.objects.get(
                    confirmation_token=request_payload["token"]
                )

            except AuthUsers.DoesNotExist:
                return Response(
                    {
                        "error": "invalid_token",
                        "error_detail": "Can't signup, the provided token is not associated with any account.",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if UserSigningUp.email != request_payload["email"]:
                return Response(
                    {
                        "error": "invalid_token",
                        "error_detail": "Can't signup, the provided email does not match the email associated with this token.",
                    },
                    status=status.HTTP_401_UNAUTHORIZED,
                )
        else:
            return Response(
                {
                    "error": "invalid_token",
                    "error_detail": "Can't signup, no token present in body",
                },
                status.HTTP_401_UNAUTHORIZED,
            )

        for field in required_fields:
            if field not in request_payload.keys():
                return Response(
                    {
                        "error": "invalid body",
                        "error_detail": f"Can't signup, no {field} present in body",
                    },
                    status.HTTP_401_UNAUTHORIZED,
                )

        if UserSigningUp.role == "company_user":
            if not is_valid_company_domain(request_payload):
                return Response(
                    {
                        "error": "invalid email",
                        "error_detail": f"Can't signup, the provided email domain is not valid, please talk to an admin",
                    },
                    status.HTTP_401_UNAUTHORIZED,
                )

        # make the request
        response_payload, status_code = gotrue_auth_request(request)

        # If signup is Sucessful
        if "user" in response_payload.keys():
            create_user_in_respective_table(request_payload, response_payload)
            apply_supabase_id_to_users_tables_and_apply_metadata(response_payload)
            # reformat token for FE
            response_payload = auth_token.format_token(response_payload)

            # Updates user password
            response_update_password = update_user_password(
                response_payload["access_token"], request.data["password"]
            )

            if response_update_password.status_code != 200:
                return Response(
                    {
                        "error": "Could not set password",
                        "error_detail": Response.text,
                    },
                    status.HTTP_401_UNAUTHORIZED,
                )

        return Response(response_payload, status=status_code)


class RecoverView(APIView):
    def post(self, request):
        payload, status_code = gotrue_auth_request(request)
        return Response(payload, status=status_code)


class InviteView(APIView):
    def post(self, request):
        request_payload = request.data

        if "role" not in request_payload.keys():
            return Response(
                {
                    "error": "Invalid request",
                    "error detail": "This endpoint requires a role",
                },
                status.HTTP_400_BAD_REQUEST,
            )

        if request_payload["role"] not in POSSIBLE_ROLES:
            return Response(
                {
                    "error": "Invalid role",
                    "error detail": f"The provided role is not valid, the valid values are: {POSSIBLE_ROLES}",
                },
                status.HTTP_400_BAD_REQUEST,
            )

        if not authorize_invite(request.headers["Authorization"]):
            return Response(
                {
                    "error": "Not authorized",
                    "error detail": "User not authorized to invite members",
                },
                status.HTTP_401_UNAUTHORIZED,
            )

        response_payload, status_code = gotrue_auth_request(request)

        # If creation was sucessuful, insert into conection table

        if "id" in response_payload:
            AuthUsers.objects.filter(pk=response_payload["id"]).update(
                role=request_payload["role"]
            )

            response_payload["role"] = request_payload["role"]

            register_company_domain(request_payload)

        return Response(response_payload, status=status_code)


@extend_schema_view(
    retrieve=extend_schema(
        summary="Retrieve information for a candidate",
        description="""
        Provide the candidate id in the url parameter and this will retrieve all the information associated with the candidate.
        
        Optional:
          Hide-Matches: bool
          If true, will not return the matches for faster loading
        """,
        parameters=[
            OpenApiParameter("Hide-Matches", bool, OpenApiParameter.HEADER),
        ],
    ),
)
class CandidatesViewSet(viewsets.ModelViewSet):
    queryset = models.Candidates.objects.all()
    serializer_class = models_serializers.CandidatesSerializer
    # permission_classes = [IsAssociationUser | IsCandidateUser]

    # def get_queryset(self):
    #     user = self.request.user
    #     print(user)
    #     queryset = models.Candidates.objects.all()
    #     if type(user) == models.Associations:
    #         return queryset
    #     elif type(user) == models.Candidates:
    #         return queryset.filter(pk=user.pk)
    #     raise "Not Allowed"


class AvailableCompanyDomainsViewSet(viewsets.ModelViewSet):
    queryset = models.AvailableCompanyDomains.objects.all()
    serializer_class = models_serializers.AvailableCompanyDomainsSerializer


@extend_schema_view(
    retrieve=extend_schema(**views_schemas.jobs_views_retrieve),
)
class JobsViewSet(viewsets.ModelViewSet):
    queryset = models.Jobs.objects.all()
    serializer_class = models_serializers.JobsSerializer


class CompaniesViewSet(viewsets.ModelViewSet):
    queryset = models.Companies.objects.all()
    serializer_class = models_serializers.CompaniesSerializer


@extend_schema_view(
    list=extend_schema(
        summary="Retrieve all jobs for a company",
        description="Provide the company id in the url parameter and this will retrieve all the jobs associated with the company",
    ),
)
class CompanyJobsViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = models_serializers.JobsSerializer

    def get_queryset(self):
        """
        This view should return a list of all the jobs for
        the company as determined by the username portion of the URL.
        """
        username = self.kwargs["company_id"]
        return models.Jobs.objects.filter(company_id=username)


# Testing file upload


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = models.Photo.objects.all()
    serializer_class = models_serializers.PhotoSerializer


class FileViewSet(viewsets.ModelViewSet):
    queryset = CandidatesDocuments.objects.all()
    serializer_class = models_serializers.FileSerializer
