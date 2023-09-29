from api.models import *
from django.contrib.auth.models import User
from rest_framework import serializers


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "is_staff"]


class SkillsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Skills
        fields = ["skill_name"]
        many = True


class AssociationsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Associations
        fields = ["name", "main_focus", "association_id"]


class InvitationSerializer(serializers.HyperlinkedModelSerializer):
    association = AssociationsSerializer()

    class Meta:
        model = Invitation
        fields = "__all__"
