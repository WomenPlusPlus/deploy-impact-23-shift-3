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
