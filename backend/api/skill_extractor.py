from typing import List
import spacy
import json
from spacy.matcher import PhraseMatcher
# load default skills data base
from skillNer.general_params import SKILL_DB
# import skill extractor
from skillNer.skill_extractor_class import SkillExtractor

"""def extract_languages(s: str, language_list: List[str]) -> List[str]:
    '''
    This functions returns list of languages that were mentioned in text
    in case of full resmblnce with one of the languages from a given list
    (case insensitive).
    '''
    lang_set = set(language.lower() for language in language_list)
    languages = set()
    for word in s.split():
        if word.lower() in lang_set:
            languages.add(word.capitalize())
    return list(languages)"""

def extract_skills (s: str, language_list: List) -> tuple:
    '''
    This function analyses bulk of text and returns lists of hard skills,
    soft skills and languages metntioned. Hard and soft skills (soft skills 
    excluding human languages)
    '''
    nlp = spacy.load("en_core_web_lg")
    # init skill extractor
    skill_extractor = SkillExtractor(nlp, SKILL_DB, PhraseMatcher)
    annotations = skill_extractor.annotate(s)
    soft_skills = set()
    hard_skills = set()
    skills_ids = set()
    matches = annotations['results']['full_matches']+annotations['results']['ngram_scored']
    for di in matches:
        skill_id = di['skill_id']
        skill_type = skill_extractor.skills_db[skill_id]['skill_type']
        skill_name = skill_extractor.skills_db[skill_id]['skill_name']
        skills_ids.add(skill_id)
        if skill_type == 'Hard Skill':
            hard_skills.add(skill_name)
        if skill_type == 'Soft Skill' and not skill_name.count('Language'):
            soft_skills.add(skill_name)
    return (json.dump(list(soft_skills)), json.dump(list(hard_skills)), json.dump(list(skills_ids)))