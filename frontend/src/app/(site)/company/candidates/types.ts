export interface CandidateForJobList {
  job_title: string;
  id: string;
  name: string;
  full_match_score: number;
  preferred_name: string;
  about_me: string;
  hard_skills: string[];
  soft_skills: string[];
  notice_period: number;
  soft_skills_match_score: number;
  hard_skills_match_score: number;
}

export interface MatchedCandidate {
  id: string;
  name: string;
  full_match_score: number;
  preferred_name: string;
  about_me: string;
  hard_skills: string[];
  soft_skills: string[];
  notice_period: number;
  soft_skills_match_score: number;
  hard_skills_match_score: number;
}

export interface JobWithMatchedCandidates {
  job_id: string;
  hard_skills: string[];
  soft_skills: string[];
  matches: MatchedCandidate[];
  job_title: string;
  location: string;
  industry: string;
  raw_description?: string;
  values?: string;
  website?: string;
  job_description: string;
  languages: string[];
  open: boolean;
  last_day_to_apply?: number;
  closed_at?: number;
  created_at?: number;
  company: number;
  location_country: number;
}
