from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import *
from .services import login_user


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


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

        return Response(data=response, status=status.HTTP_200_OK)


"""
class CourseListApi(Authentication, APIView)
"""
