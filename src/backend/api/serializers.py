from api import models
from api.auth_models import AuthUsers, RefreshTokens
from rest_framework import serializers
from api.tokenization_n_embedding import generate_embeddings
from api.skill_extractor import extract_skills
from api.serializer_services import (
    generate_match_output,
    generate_match_percentaged,
    hide_matches_in_header,
    is_calling_just_one_job_or_candidate,
)



class LanguagesProficiencySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LanguagesProficiency
        fields = "__all__"

    def to_representation(self, instance):
        return instance.language_proficiency_name


class LanguagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Languages
        fields = "__all__"

    def to_representation(self, instance):
        return instance.language_name

class AuthUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AuthUsers
        fields = ["id", "email"]
        many = True


class AssociationsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Associations
        fields = ["name", "main_focus", "association_id"]


class CantonsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Cantons
        fields = "__all__"
        many = True


class CountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Countries
        fields = ["country_name_in_english"]

    def to_representation(self, instance):
        return instance.country_name_in_english


class HardSkillsNamesSerializer(serializers.PrimaryKeyRelatedField):
    queryset = models.Skills.objects.all()

    class Meta:
        model = models.Skills
        fields = "__all__"

    def to_representation(self, value):
        return value.skill_name


class SoftSkillsNamesSerializer(serializers.PrimaryKeyRelatedField):
    queryset = models.SoftSkills.objects.all()

    class Meta:
        model = models.SoftSkills
        fields = "__all__"

    def to_representation(self, value):
        return value.soft_skill_name

class LanguagesWithProficiencyNamesSerializer(serializers.PrimaryKeyRelatedField):
    queryset = models.LanguagesWithProficiency.objects.all()
    name = LanguagesSerializer()
    proficiency = LanguagesProficiencySerializer()

    class Meta:
        model = models.LanguagesWithProficiency
        fields = "__all__"

    def to_representation(self, value):
        return {"name": value.name.__str__(), "proficieny": value.proficiency.__str__()}


class CandidatesSerializer(serializers.ModelSerializer):
    hard_skills = HardSkillsNamesSerializer(
        source="hard_skill_test_matching", many=True
    )
    soft_skills = SoftSkillsNamesSerializer(
        source="soft_skill_test_matching", many=True
    )

    matches = serializers.SerializerMethodField(
        "get_matches", read_only=True, source="matches"
    )

    Initiatives = serializers.StringRelatedField(many=True, read_only=True)
    preferred_work_model = serializers.StringRelatedField(read_only=True)
    languages = LanguagesWithProficiencyNamesSerializer(
        source="languages_linked", many=True
    )

    work_permission_CH = serializers.StringRelatedField(read_only=True)

    country = CountriesSerializer(source="last_country")

    work_model = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = models.Candidates
        exclude = (
            "hard_skill_test_matching",
            "soft_skill_test_matching",
            "aboutme_experinece_embedded",
            "languages_linked",
            "last_country"
            # "experience_abedded",
        )
        many = True

    def validate(self, data):
        (
            data["soft_skill_test_matching"],
            data["hard_skill_test_matching"],
        ) = extract_skills(data["about_me"] + "\n" + data["experience"])
        data["aboutme_experinece_embedded"] = generate_embeddings(
            data["about_me"] + "\n" + data["experience"]
        )

        data["soft_skill_test_matching"] = models.SoftSkills.objects.filter(
            soft_skill_name__in=data["soft_skill_test_matching"]
        )
        data["hard_skill_test_matching"] = models.Skills.objects.filter(
            skill_name__in=data["hard_skill_test_matching"]
        )

        return data

    def get_matches(self, instance):
        if hide_matches_in_header(self):
            return "Hide-Matches set to true"

        if not is_calling_just_one_job_or_candidate(self.context.get("request")):
            return "Match only available when calling with Job or Company ID"

        match_percentages = generate_match_percentaged(instance)

        return generate_match_output(match_percentages, instance)



class InvitationSerializer(serializers.HyperlinkedModelSerializer):
    association = AssociationsSerializer()

    class Meta:
        model = models.Invitation
        fields = "__all__"


class PersonalitiesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Personalities
        fields = "__all__"
        many = True


class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Skills
        fields = "__all__"
        many = True


class SoftSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SoftSkills
        fields = "__all__"
        many = True


class StatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Status
        fields = "__all__"
        many = True


class ListValuesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.ListValues
        fields = "__all__"
        many = True


class WorkPermitsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.WorkPermits
        fields = "__all__"
        many = True


class WorkModelsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.WorkModels
        fields = "__all__"
        many = True


class AvailableCompanyDomainsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.AvailableCompanyDomains
        fields = "__all__"
        many = True


class JobsSerializer(serializers.ModelSerializer):
    hard_skills = HardSkillsNamesSerializer(
        source="hard_skill_test_matching", many=True
    )
    soft_skills = SoftSkillsNamesSerializer(
        source="soft_skill_test_matching", many=True
    )

    matches = serializers.SerializerMethodField(
        "get_matches", read_only=True, source="matches"
    )

    languages = LanguagesSerializer(
        source="languages_linked", many=True
    )

    location_country = CountriesSerializer()

    work_model = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = models.Jobs
        exclude = (
            "soft_skill_test_matching",
            "hard_skill_test_matching",
            "description_embedded",
            "languages_linked"
        )
        many = True

    def validate(self, data):
        (
            data["soft_skill_test_matching"],
            data["hard_skill_test_matching"],
        ) = extract_skills(data["raw_description"])

        data["soft_skill_test_matching"] = models.SoftSkills.objects.filter(
            soft_skill_name__in=data["soft_skill_test_matching"]
        )
        data["hard_skill_test_matching"] = models.Skills.objects.filter(
            skill_name__in=data["hard_skill_test_matching"]
        )

        data["description_embedded"] = generate_embeddings(data["raw_description"])

        return data

    def get_matches(self, instance):
        if hide_matches_in_header(self):
            return "Hide-Matches set to true"

        if not is_calling_just_one_job_or_candidate(self.context.get("request")):
            return "Match only available when calling with Job or Company ID"

        match_percentages = generate_match_percentaged(instance)

        return generate_match_output(match_percentages, instance)


class CompaniesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Companies
        fields = "__all__"
        many = True


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Photo
        fields = "__all__"


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CandidatesDocuments
        fields = ["file_name", "file", "description", "candidate", "created_at"]


class RefreshTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefreshTokens
        fields = "__all__"
