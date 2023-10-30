import pandas as pd 
from bs4 import BeautifulSoup
import re
import langid
import yaml
from typing import List

import spacy
from spacy.matcher import PhraseMatcher
# load default skills data base
from skillNer.general_params import SKILL_DB
# import skill extractor
from skillNer.skill_extractor_class import SkillExtractor

def clean_from_html(s: str) -> str:
    '''
    This functions returns a string clean from html symbols.
    '''
    bs_result = BeautifulSoup(s, 'lxml').text
    result = re.sub('\n', ' ', bs_result)
    return result

def read_csv_to_list(file_name: str) -> List[str]:
    '''
    This functions returns a string cleaned from html symbols.
    '''
    my_file = open(file_name, "r") 
    data = my_file.read() 
    data_list = data.split('\n')
    my_file.close()
    return data_list

def if_en(s: str) -> bool:
    '''
    This functions returns boolean whether the main langugage of text is English or not
    '''
    return langid.classify(str(s))[0] == 'en'

def extract_languages(s: str, language_list: List[str]) -> List[str]:
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
    return list(languages)

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
    matches = annotations['results']['full_matches']+annotations['results']['ngram_scored']
    for di in matches:
        skill_id = di['skill_id']
        skill_type = skill_extractor.skills_db[skill_id]['skill_type']
        skill_name = skill_extractor.skills_db[skill_id]['skill_name']
        if skill_type == 'Hard Skill':
            hard_skills.add(skill_name)
        if skill_type == 'Soft Skill' and not skill_name.count('Language'):
            soft_skills.add(skill_name)
    return (', '.join(list(soft_skills)), ', '.join(list(hard_skills)), ', '.join(extract_languages(s, language_list)))

# Function to randomly select n sentences and append them to the existing content with word replacements
def select_and_append_sentences(existing_text, sentences, n):
    selected_sentences = random.sample(sentences, n)
    appended_text = existing_text + " ".join(selected_sentences)

    # Separate sentences with ". " only if it doesn't already exist
    if not appended_text.endswith("."):
        appended_text += ". "
     
    # Remove sentences starting with "We offer you"
    appended_text = re.sub(r'(?:^|\.)[^.]*\b(?:We offer).*?(?=\.)', '', appended_text)
    
    # Replace "You are" with "I am" and "You have" with "I have"
    appended_text = re.sub(r'\bYou are\b', 'I am', appended_text)
    appended_text = re.sub(r'\bYou have\b', 'I have', appended_text)
    appended_text = re.sub(r'\bWe are looking for\b', 'I am', appended_text)
    appended_text = re.sub(r'\bOur requirement is for a\b', 'I am', appended_text)
    appended_text = re.sub(r'\bIn this role\b', '', appended_text)
    appended_text = re.sub(r'\bResponsibilities:\b', '', appended_text)
    #appended_text = re.sub(r'\bWhat we offer:\b', '', appended_text)
    #appended_text = re.sub(r'\bWhat we offer\b', '', appended_text)
    appended_text = re.sub(r'\bis a must\b', '', appended_text)
    appended_text = re.sub(r'\bYou will\b', 'I am able to', appended_text)
    appended_text = re.sub(r'\bYou will be\b', 'I am', appended_text)
    appended_text = re.sub(r'\bMust have built\b', 'Experience in', appended_text)
    appended_text = re.sub(r'\Your role:\b', 'I', appended_text)
    appended_text = re.sub(r'\Your responsibilities:\b', 'My experience:', appended_text)

   
    
    return appended_text