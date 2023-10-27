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
