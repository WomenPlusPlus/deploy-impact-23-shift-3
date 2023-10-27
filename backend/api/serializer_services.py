from requests import request
from api.matching_algorithm import get_free_text_match
from api.models import Candidates, Jobs
import os

HARD_SKILL_PERCENTAGE = float(os.environ["HARD_SKILL_PERCENTAGE"])
SOFT_SKILL_PERCENTAGE = float(os.environ["SOFT_SKILL_PERCENTAGE"])
FREE_TEXT_PERCENTAGE = float(os.environ["FREE_TEXT_PERCENTAGE"])


def hide_matches_in_header(instance):
    headers = instance.context["request"].headers
    if "Hide-Matches" in headers:
        if headers["Hide-Matches"] == "true":
            return True
        else:
            return False


def generate_match_percentaged(instance: Candidates | Jobs) -> dict:
    match_percentages = {}

    instance_soft_skills = list(
        instance.soft_skill_test_matching.values_list("soft_skill_id", flat=True)
    )
    instance_hard_skills = list(
        instance.hard_skill_test_matching.values_list("skill_id", flat=True)
    )

    try:
        getattr(instance, "description_embedded")
        is_instance_job = True
    except:
        is_instance_job = False

    candidate_embedded_field = "aboutme_experinece_embedded"
    job_embedded_field = "description_embedded"

    for match in instance.matches:
        soft_skills_match = match.get_match_percentage(instance_soft_skills, "soft")
        hard_skills_match = match.get_match_percentage(instance_hard_skills, "hard")

        free_text_match = get_free_text_match(
            getattr(
                instance,
                job_embedded_field if is_instance_job else candidate_embedded_field,
            ),
            getattr(
                match,
                job_embedded_field if not is_instance_job else candidate_embedded_field,
            ),
        )

        match_percentages[match.pk] = {
            "soft_skills_match_score": soft_skills_match,
            "hard_skills_match_score": hard_skills_match,
            "free_text_match_score": free_text_match,
            "full_match_score": (
                soft_skills_match * SOFT_SKILL_PERCENTAGE
                + hard_skills_match * HARD_SKILL_PERCENTAGE
                + free_text_match * FREE_TEXT_PERCENTAGE
            ),
        }

    return match_percentages


def generate_match_output(match_percentages: dict, instance: Candidates | Jobs) -> dict:
    return [
        {
            "id": match.pk,
            "name": match.preferred_name,
            "full_match_score": match_percentages[match.pk]["full_match_score"],
            "preferred_name": match.preferred_name,
            "about_me": match.about_me,
            "hard_skills": match.hard_skill_test_matching.values_list(
                "skill_name", flat=True
            ),
            "free_text_match_score": match_percentages[match.pk][
                "free_text_match_score"
            ],
            "notice_period": match.notice_period_months,
            "soft_skills_match_score": match_percentages[match.pk][
                "soft_skills_match_score"
            ],
            "hard_skills_match_score": match_percentages[match.pk][
                "hard_skills_match_score"
            ],
        }
        for match in instance.matches
    ]


def is_calling_just_one_job_or_candidate(req: request):
    job_id = req.path.split("/")
    job_id = job_id[-2] if job_id[-1] == "" else job_id[-1]

    try:
        job_id = int(job_id)
    except Exception:
        return False

    return True
