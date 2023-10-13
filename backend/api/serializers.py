from django.contrib.auth.models import User

from api.models import *
from rest_framework import serializers


# Serializers define the API representation.
class AuthUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AuthUsers
        fields = ["id", "email"]
        many = True


class AssociationsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Associations
        fields = ["name", "main_focus", "association_id"]


class CantonsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cantons
        fields = "__all__"
        many = True


class CountriesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Countries
        fields = ["country_name_in_english"]
        many = True


class CandidatesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Candidates
        fields = "__all__"
        many = True


class LanguagesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Languages
        fields = "__all__"


class LanguagesProficiencySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LanguagesProficiency
        fields = "__all__"


class CandidatesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Candidates
        fields = "__all__"
        many = True


class InvitationSerializer(serializers.HyperlinkedModelSerializer):
    association = AssociationsSerializer()

    class Meta:
        model = Invitation
        fields = "__all__"


class PersonalitiesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Personalities
        fields = "__all__"
        many = True


class SkillsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Skills
        fields = "__all__"
        many = True


class SoftSkillsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SoftSkills
        fields = "__all__"
        many = True


class StatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Status
        fields = "__all__"
        many = True


class ListValuesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ListValues
        fields = "__all__"
        many = True


class WorkPermitsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WorkPermits
        fields = "__all__"
        many = True


class WorkModelsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WorkModels
        fields = "__all__"
        many = True


class AvailableCompanyDomainsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AvailableCompanyDomains
        fields = "__all__"
        many = True