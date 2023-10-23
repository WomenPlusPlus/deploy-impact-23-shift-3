export interface CandidateForJobList {
  candidate_id: string;
  matching: {
    job_title: string;
    matching_score: number;
  }[];
  preferred_name?: string;
  current_position?: string;
  about_me?: string;
  hard_skills: string[];
  soft_skills: string[];
  start_on: number;
}

export interface CandidateForJobListSingleMatch {
  candidate_id: string;
  job_title: string;
  matching_score: number;
  preferred_name?: string;
  current_position?: string;
  about_me?: string;
  hard_skills: string[];
  soft_skills: string[];
  start_on: number;
}
