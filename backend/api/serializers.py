from django.contrib.auth.models import User
from api.models import *
from rest_framework import serializers
import os
from api.matching_algorithm import get_free_text_match
from api.tokenization_n_embedding import generate_embeddings
from api.skill_extractor import extract_skills


HARD_SKILL_PERCENTAGE = float(os.environ["HARD_SKILL_PERCENTAGE"])
SOFT_SKILL_PERCENTAGE = float(os.environ["SOFT_SKILL_PERCENTAGE"])
FREE_TEXT_PERCENTAGE = float(os.environ["FREE_TEXT_PERCENTAGE"])


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


class CountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Countries
        fields = ["country_name_in_english"]

    def to_representation(self, instance):
        return instance.country_name_in_english


class HardSkillsNamesSerializer(serializers.PrimaryKeyRelatedField):
    queryset = Skills.objects.all()

    class Meta:
        model = Skills
        fields = "__all__"

    def to_representation(self, value):
        return value.skill_name


class SoftSkillsNamesSerializer(serializers.PrimaryKeyRelatedField):
    queryset = SoftSkills.objects.all()

    class Meta:
        model = SoftSkills
        fields = "__all__"

    def to_representation(self, value):
        return value.soft_skill_name


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

    class Meta:
        model = Candidates
        exclude = (
            "hard_skill_test_matching",
            "soft_skill_test_matching",
            "aboutme_experinece_embedded",
            # "experience_abedded",
        )
        many = True

    def validate(self, data):
        data["soft_skills"], data["hard_skills"] = extract_skills(
            data["about_me"] + "\n" + data["experience"]
        )
        data["aboutme_experinece_embedded"] = generate_embeddings(
            data["about_me"] + "\n" + data["experience"]
        )

        return data

    def get_matches(self, instance):
        headers = self.context["request"].headers
        if "Hide-Matches" in headers:
            if headers["Hide-Matches"] == "true":
                return "Hide-Matches set to true"

        req = self.context.get("request")
        job_id = req.path.split("/")[-2]
        try:
            job_id = int(job_id)
        except Exception:
            return "Match only available when calling with Candidate ID"

        candidate = instance
        candidate_soft_skills = list(
            candidate.soft_skill_test_matching.values_list("soft_skill_id", flat=True)
        )
        candidate_hard_skills = list(
            candidate.hard_skill_test_matching.values_list("skill_id", flat=True)
        )
        candidate_embeddings = candidate.aboutme_experinece_embedded

        match_percentages = {}

        jobs = instance.matches
        for job in jobs:
            soft_skills_match = job.get_match_percentage(candidate_soft_skills, "soft")
            hard_skills_match = job.get_match_percentage(candidate_hard_skills, "hard")
            free_text_match = get_free_text_match(
                job_embeddings=job.description_embedded,
                candidate_embeddings=candidate_embeddings,
            )

            match_percentages[job.job_id] = {
                "soft_skills": soft_skills_match,
                "hard_skills": hard_skills_match,
                "full_match": (
                    soft_skills_match * SOFT_SKILL_PERCENTAGE
                    + hard_skills_match * HARD_SKILL_PERCENTAGE
                    + free_text_match * FREE_TEXT_PERCENTAGE
                ),
            }

        return [
            {
                "id": candidate.job_id,
                "name": candidate.job_title,
                "full_match_score": match_percentages[candidate.job_id]["full_match"],
                "hard_skills": candidate.hard_skill_test_matching.values_list(
                    "skill_name", flat=True
                ),
                "soft_skills": candidate.soft_skill_test_matching.values_list(
                    "soft_skill_name", flat=True
                ),
                "soft_skills_match_score": match_percentages[candidate.job_id][
                    "soft_skills"
                ],
                "hard_skills_match_score": match_percentages[candidate.job_id][
                    "hard_skills"
                ],
            }
            for candidate in jobs
        ]


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


class JobsSerializer(serializers.ModelSerializer):
    hard_skills = serializers.StringRelatedField(
        many=True,
        source="hard_skill_test_matching",
    )

    soft_skills = serializers.StringRelatedField(
        many=True,
        source="soft_skill_test_matching",
    )

    matches = serializers.SerializerMethodField(
        "get_matches", read_only=True, source="matches"
    )

    location_country = CountriesSerializer()

    class Meta:
        model = Jobs
        exclude = (
            "soft_skill_test_matching",
            "hard_skill_test_matching",
        )
        many = True

    def validate(self, data):
        data["soft_skills"], data["hard_skills"] = extract_skills(
            data["raw_description"]
        )
        data["description_embedded"] = generate_embeddings(data["raw_description"])

        return data

    def get_matches(self, instance):
        headers = self.context["request"].headers
        if "Hide-Matches" in headers:
            if headers["Hide-Matches"] == "true":
                return "Hide-Matches set to true"

        job = instance
        job_soft_skills = list(
            job.soft_skill_test_matching.values_list("soft_skill_id", flat=True)
        )
        job_hard_skills = list(
            job.hard_skill_test_matching.values_list("skill_id", flat=True)
        )

        match_percentages = {}

        candidates = instance.matches
        for candidate in candidates:
            soft_skills_match = candidate.get_match_percentage(job_soft_skills, "soft")
            hard_skills_match = candidate.get_match_percentage(job_hard_skills, "hard")
            free_text_match = get_free_text_match(
                job_embeddings=job.description_embedded,
                candidate_embeddings=candidate.aboutme_experinece_embedded,
            )

            match_percentages[candidate.candidate_id] = {
                "soft_skills": soft_skills_match,
                "hard_skills": hard_skills_match,
                "full_match": (
                    soft_skills_match * SOFT_SKILL_PERCENTAGE
                    + hard_skills_match * HARD_SKILL_PERCENTAGE
                    + free_text_match * FREE_TEXT_PERCENTAGE
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
                "hard_skills": candidate.hard_skill_test_matching.values_list(
                    "skill_name", flat=True
                ),
                "soft_skills": candidate.soft_skill_test_matching.values_list(
                    "soft_skill_name", flat=True
                ),
                "notice_period": candidate.notice_period_months,
                "soft_skills_match_score": match_percentages[candidate.candidate_id][
                    "soft_skills"
                ],
                "hard_skills_match_score": match_percentages[candidate.candidate_id][
                    "hard_skills"
                ],
            }
            for candidate in candidates
        ]


class CompaniesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Companies
        fields = "__all__"
        many = True
