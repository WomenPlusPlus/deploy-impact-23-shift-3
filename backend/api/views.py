from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api import serializers as model_serializers
from rest_framework import serializers
from api.services import login_signup_user
from django.db import models
from api.models import CandidatesDocuments


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


class LoginSignupView(APIView):
    def post(self, request):
        payload = login_signup_user(request)

        if "error" in payload.keys():
            if payload["error"] == "invalid_grant":
                status_code = status.HTTP_401_UNAUTHORIZED
            else:
                status_code = status.HTTP_400_BAD_REQUEST
        else:
            status_code = status.HTTP_200_OK

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


class FileViewSet(viewsets.ModelViewSet):
    queryset = CandidatesDocuments.objects.all()
    serializer_class = FileSerializer


"""
class CourseListApi(Authentication, APIView)
"""
