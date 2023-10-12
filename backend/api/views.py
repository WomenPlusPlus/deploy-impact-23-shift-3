import os
from django.db import models
from rest_framework.response import Response
from rest_framework.views import APIView

import json
from api import serializers as model_serializers
from api.auth_models import AuthUsers, RefreshTokens
from api import auth_token
from api.models import CandidatesDocuments
from api.services import (
    apply_supabase_id_to_users_tables,
    authorize_invte,
    gotrue_auth_request,
    update_user_password,
)
from rest_framework import serializers, viewsets, status

POSSIBLE_ROLES = json.loads(os.environ["POSSIBLE_ROLES"])
SUPABASE_SERVICE_ROLE_APIKEY = os.environ["SUPABASE_SERVICE_ROLE_APIKEY"]


class AuthUserViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]

    model_serializers.AuthUsers.objects.using("auth")
    queryset = model_serializers.AuthUsers.objects.all()
    serializer_class = model_serializers.AuthUserSerializer


class CantonsViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.Cantons.objects.all()
    serializer_class = model_serializers.CantonsSerializer


class CountriesViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.Countries.objects.all()
    serializer_class = model_serializers.CountriesSerializer


class AssociationsViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.Associations.objects.all()
    serializer_class = model_serializers.AssociationsSerializer


class LanguagesViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.Languages.objects.all()
    serializer_class = model_serializers.LanguagesSerializer


class LanguagesProficiencyViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.LanguagesProficiency.objects.all()
    serializer_class = model_serializers.LanguagesProficiencySerializer


class InvitationsViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.Invitation.objects.all()
    serializer_class = model_serializers.InvitationSerializer


class SkillsViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.Skills.objects.all()
    serializer_class = model_serializers.SkillsSerializer


class StatusViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.Status.objects.all()
    serializer_class = model_serializers.StatusSerializer


class WorkModelsViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.WorkModels.objects.all()
    serializer_class = model_serializers.WorkModelsSerializer


class WorkPermitsViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.WorkPermits.objects.all()
    serializer_class = model_serializers.WorkPermitsSerializer


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

        if "password" not in request_payload.keys():
            return Response(
                {
                    "error": "invalid body",
                    "error_detail": "Can't signup, no password present in body",
                },
                status.HTTP_401_UNAUTHORIZED,
            )

        response_payload, status_code = gotrue_auth_request(request)

        if "user" in response_payload.keys():
            apply_supabase_id_to_users_tables(response_payload)
            response_payload = auth_token.format_token(response_payload)
            response_update_password = update_user_password(
                response_payload["access_token"], request.data["password"]
            )

            print(response_update_password)

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

        if not authorize_invte(request.headers["Authorization"]):
            return Response(
                {
                    "error": "Not authorized",
                    "error detail": "User not authorized to invite members",
                },
                status.HTTP_401_UNAUTHORIZED,
            )

        response_payload, status_code = gotrue_auth_request(request)

        # Insert into conection table
        AuthUsers.objects.filter(pk=response_payload["id"]).update(
            role=request_payload["role"]
        )

        response_payload["role"] = request_payload["role"]

        return Response(response_payload, status=status_code)


class CandidatesViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.Candidates.objects.all()
    serializer_class = model_serializers.CandidatesSerializer


# Testing file upload


class Photo(models.Model):
    id = models.AutoField(primary_key=True)
    file = models.ImageField(upload_to="avatars")


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = "__all__"


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidatesDocuments
        fields = ["file_name", "file", "description", "candidate", "created_at"]


class RefreshTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefreshTokens
        fields = "__all__"


class FileViewSet(viewsets.ModelViewSet):
    queryset = CandidatesDocuments.objects.all()
    serializer_class = FileSerializer
