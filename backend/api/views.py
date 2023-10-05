from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import *
from .services import login_user, signup_user
from rest_framework import mixins


class AuthUserViewSet(viewsets.ModelViewSet):
    AuthUsers.objects.using("auth")
    queryset = AuthUsers.objects.all()
    serializer_class = AuthUserSerializer


class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer


class AssociationsViewSet(viewsets.ModelViewSet):
    queryset = Associations.objects.all()
    serializer_class = AssociationsSerializer


class InvitationsViewSet(viewsets.ModelViewSet):
    queryset = Invitation.objects.all()
    serializer_class = InvitationSerializer


class LoginView(APIView):
    def post(self, request):
        response = login_user(request)

        return Response(response, status=status.HTTP_200_OK)


class SignupView(APIView):
    def post(self, request):
        response = signup_user(request)

        return Response(data=response, status=status.HTTP_200_OK)


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


class File(models.Model):
    id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to="files")


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer


"""
class CourseListApi(Authentication, APIView)
"""
