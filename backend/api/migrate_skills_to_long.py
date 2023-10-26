from api.models import Candidates, Jobs, SoftSkills, Skills
import json


def migrate_candidates_soft_skills_to_long():
    candidates = Candidates.objects.all().values("candidate_id", "soft_skills")

    set_soft_skills: set = set()

    dict_candidates_soft_skills: dict = {}
    dict_soft_skills: dict = {}

    for cand in candidates.iterator():
        cand_soft_skills: list = json.loads(cand["soft_skills"].replace("'", '"'))
        dict_candidates_soft_skills[cand["candidate_id"]] = cand_soft_skills

        set_soft_skills.update(cand_soft_skills)

    soft_skills = SoftSkills.objects.filter(soft_skill_name__in=set_soft_skills)

    dict_soft_skills = {
        ss.soft_skill_name: ss.soft_skill_id for ss in soft_skills.iterator()
    }

    for cand, cand_skills in dict_candidates_soft_skills.items():
        for i in cand_skills:
            if i in dict_soft_skills:
                print(dict_soft_skills[i])

        dict_candidates_soft_skills[cand] = [
            dict_soft_skills[i] for i in cand_skills if i in dict_soft_skills
        ]

    for id, items in dict_candidates_soft_skills.items():
        if len(items) > 0:
            Candidates.objects.get(pk=id).soft_skill_test_matching.set(items)


def migrate_candidates_hard_skills_to_long():
    candidates = Candidates.objects.all().values("candidate_id", "hard_skills")

    set_soft_skills: set = set()

    dict_candidates_soft_skills: dict = {}
    dict_soft_skills: dict = {}

    for cand in candidates.iterator():
        if type(cand["hard_skills"]) == str:
            cand_soft_skills: list = cand["hard_skills"].split(", ")
            dict_candidates_soft_skills[cand["candidate_id"]] = cand_soft_skills

            set_soft_skills.update(cand_soft_skills)

    soft_skills = Skills.objects.filter(skill_name__in=set_soft_skills)

    dict_soft_skills = {ss.skill_name: ss.skill_id for ss in soft_skills.iterator()}

    for cand, cand_skills in dict_candidates_soft_skills.items():
        dict_candidates_soft_skills[cand] = [
            dict_soft_skills[i] for i in cand_skills if i in dict_soft_skills
        ]

    for id, items in dict_candidates_soft_skills.items():
        if len(items) > 0:
            Candidates.objects.get(pk=id).hard_skill_test_matching.set(items)


def migrate_job_hard_skills_to_long():
    candidates = Jobs.objects.all().values("job_id", "hard_skills")

    set_soft_skills: set = set()

    dict_candidates_soft_skills: dict = {}
    dict_soft_skills: dict = {}

    for cand in candidates.iterator():
        if type(cand["hard_skills"]) == str:
            cand_soft_skills: list = json.loads(cand["hard_skills"])
            dict_candidates_soft_skills[cand["job_id"]] = cand_soft_skills

            set_soft_skills.update(cand_soft_skills)

    soft_skills = Skills.objects.filter(skill_name__in=set_soft_skills)

    dict_soft_skills = {ss.skill_name: ss.skill_id for ss in soft_skills.iterator()}

    for cand, cand_skills in dict_candidates_soft_skills.items():
        dict_candidates_soft_skills[cand] = [
            dict_soft_skills[i] for i in cand_skills if i in dict_soft_skills
        ]

    for id, items in dict_candidates_soft_skills.items():
        if len(items) > 0:
            Jobs.objects.get(pk=id).hard_skill_test_matching.set(items)


def migrate_job_soft_skills_to_long():
    candidates = Jobs.objects.all().values("job_id", "soft_skills")

    set_soft_skills: set = set()

    dict_candidates_soft_skills: dict = {}
    dict_soft_skills: dict = {}

    for cand in candidates.iterator():
        if type(cand["soft_skills"]) == str:
            cand_soft_skills: list = json.loads(cand["soft_skills"])
            dict_candidates_soft_skills[cand["job_id"]] = cand_soft_skills

            set_soft_skills.update(cand_soft_skills)

    soft_skills = SoftSkills.objects.filter(soft_skill_name__in=set_soft_skills)

    dict_soft_skills = {
        ss.soft_skill_name: ss.soft_skill_id for ss in soft_skills.iterator()
    }

    for cand, cand_skills in dict_candidates_soft_skills.items():
        dict_candidates_soft_skills[cand] = [
            dict_soft_skills[i] for i in cand_skills if i in dict_soft_skills
        ]

    for id, items in dict_candidates_soft_skills.items():
        if len(items) > 0:
            Jobs.objects.get(pk=id).soft_skill_test_matching.set(items)
