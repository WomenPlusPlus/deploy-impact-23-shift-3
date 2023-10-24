from django.contrib.auth.models import User
from api.models import *
from rest_framework import serializers
import os


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


class CandidatesSerializer(serializers.ModelSerializer):
    hard_skills = serializers.StringRelatedField(
        many=True,
        source="hard_skill_test_matching",
    )

    soft_skills = serializers.StringRelatedField(
        many=True, source="soft_skill_test_matching"
    )

    class Meta:
        model = Candidates
        exclude = (
            "hard_skill_test_matching",
            "soft_skill_test_matching",
        )
        many = True


class LanguagesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Languages
        fields = "__all__"


class LanguagesProficiencySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LanguagesProficiency
        fields = "__all__"


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


class CandidateMatchPercentageSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        HARD_SKILL_PERCENTAGE = float(os.environ["HARD_SKILL_PERCENTAGE"])
        SOFT_SKILL_PERCENTAGE = float(os.environ["SOFT_SKILL_PERCENTAGE"])
        FREE_TEXT_PERCENTAGE = float(os.environ["FREE_TEXT_PERCENTAGE"])

        # I don't know how to get the parent's serializer so I did this, it's very ugly code
        req = self.context.get("request")
        job_id = req.path.split("/")[-2]
        try:
            job_id = int(job_id)
        except Exception:
            return "Match only available when calling with Job ID"

        job = Jobs.objects.get(pk=job_id)
        job_soft_skills = list(
            job.soft_skill_test_matching.values_list("soft_skill_id", flat=True)
        )
        job_hard_skills = list(
            job.hard_skill_test_matching.values_list("skill_id", flat=True)
        )

        match_percentages = {}

        for candidate in instance:
            soft_skills_match = candidate.get_match_percentage(job_soft_skills, "soft")
            hard_skills_match = candidate.get_match_percentage(job_hard_skills, "hard")

            match_percentages[candidate.candidate_id] = {
                "soft_skills": soft_skills_match,
                "hard_skills": hard_skills_match,
                "full_match": (
                    soft_skills_match * SOFT_SKILL_PERCENTAGE
                    + hard_skills_match * HARD_SKILL_PERCENTAGE
                ),
            }

        return [
            {
                "id": candidate.candidate_id,
                "name": candidate.preferred_name,
                "full_match_score": match_percentages[candidate.candidate_id][
                    "full_match"
                ],
                "preferred_name": candidate.preferred_name,
                "about_me": candidate.about_me,
                "hard_skills": candidate.hard_skills,
                "soft_skills": candidate.soft_skills,
                "notice_period": candidate.notice_period_months,
                "soft_skills_match_score": match_percentages[candidate.candidate_id][
                    "soft_skills"
                ],
                "hard_skills_match_score": match_percentages[candidate.candidate_id][
                    "hard_skills"
                ],
            }
            for candidate in instance
        ]

    class Meta:
        model = Candidates
        fields = ["candidate_id"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class JobsSerializer(serializers.ModelSerializer):
    hard_skills = serializers.StringRelatedField(
        many=True,
        source="hard_skill_test_matching",
    )

    soft_skills = serializers.StringRelatedField(
        read_only=True,
        many=True,
        source="soft_skill_test_matching",
    )

    matches = CandidateMatchPercentageSerializer()

    class Meta:
        model = Jobs
        exclude = (
            "soft_skill_test_matching",
            "hard_skill_test_matching",
        )
        many = True


class CompaniesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Companies
        fields = "__all__"
        many = True
