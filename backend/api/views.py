from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from api import serializers as model_serializers
from rest_framework import serializers
from api.services import gotrue_auth_request
from django.db import models
from api.models import CandidatesDocuments
from api.auth_models import ResfreshToken


class AuthUserViewSet(viewsets.ModelViewSet):
    model_serializers.AuthUsers.objects.using("auth")
    queryset = model_serializers.AuthUsers.objects.all()
    serializer_class = model_serializers.AuthUserSerializer


class SkillsViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.Skills.objects.all()
    serializer_class = model_serializers.SkillsSerializer


class AssociationsViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.Associations.objects.all()
    serializer_class = model_serializers.AssociationsSerializer


class InvitationsViewSet(viewsets.ModelViewSet):
    queryset = model_serializers.Invitation.objects.all()
    serializer_class = model_serializers.InvitationSerializer


class LoginView(APIView):
    def post(self, request):
        payload, status_code = gotrue_auth_request(request)
        return Response(payload, status=status_code)


class LogoutView(APIView):
    def post(self, request):
        payload, status_code = gotrue_auth_request(request)
        return Response(payload, status=status_code)


class SignupView(APIView):
    def post(self, request):
        payload, status_code = gotrue_auth_request(request)
        return Response(payload, status=status_code)


class RecoverView(APIView):
    def post(self, request):
        payload, status_code = gotrue_auth_request(request)
        return Response(payload, status=status_code)


class InviteView(APIView):
    def post(self, request):
        payload, status_code = gotrue_auth_request(request)
        return Response(payload, status=status_code)


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
        model = ResfreshToken
        fields = "__all__"


class FileViewSet(viewsets.ModelViewSet):
    queryset = CandidatesDocuments.objects.all()
    serializer_class = FileSerializer
