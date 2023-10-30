from typing import List
import spacy
import json
from spacy.matcher import PhraseMatcher

# load default skills data base
from skillNer.general_params import SKILL_DB

# import skill extractor
from skillNer.skill_extractor_class import SkillExtractor


def extract_skills(s: str) -> tuple:
    """
    This function analyses bulk of text and returns lists of hard skills,
    soft skills and languages metntioned. Hard and soft skills (soft skills
    excluding human languages)
    """
    nlp = spacy.load("en_core_web_lg")

    # init skill extractor
    skill_extractor = SkillExtractor(nlp, SKILL_DB, PhraseMatcher)
    annotations = skill_extractor.annotate(s)
    soft_skills = set()
    hard_skills = set()

    matches = (
        annotations["results"]["full_matches"] + annotations["results"]["ngram_scored"]
    )

    for di in matches:
        skill_id = di["skill_id"]
        skill_type = skill_extractor.skills_db[skill_id]["skill_type"]
        skill_name = skill_extractor.skills_db[skill_id]["skill_name"]
        if skill_type == "Hard Skill":
            hard_skills.add(skill_name)
        if skill_type == "Soft Skill" and not skill_name.count("Language"):
            soft_skills.add(skill_name)
    return (
        soft_skills,
        hard_skills,
    )
