from django.contrib.auth.models import User
from rest_framework import viewsets
from api.serializers import *


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


"""
class CourseListApi(Authentication, APIView)
"""
