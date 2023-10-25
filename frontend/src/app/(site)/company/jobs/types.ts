export interface JobPost {
  job_id: string;
  job_title: string;
  job_description: string;
  created_at: number;
  expires_at: number;
  starts_at: number;
  job_type: string;
  work_model: string;
  open: boolean;
  matched_candidates: number;
}

export interface JobPostNew {
  job_id: string;
  hard_skills: string[];
  soft_skills: string[];
  matches: string;
  job_title: string;
  location: string;
  industry: string;
  raw_description: string;
  job_description: string;
  values: string[];
  website: string;
  languages: string[];
  open: boolean;
  description_embedded: string;
  last_day_to_apply: string;
  closed_at: number;
  created_at: number;
  job_type?: string;
  work_model?: string;
  matched_candidates?: number;
}
