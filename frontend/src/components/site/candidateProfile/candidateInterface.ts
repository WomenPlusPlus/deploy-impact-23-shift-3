export interface Matches {
  id: number;
  job_title: string;
  full_match_score: number;
  // to come i hope!
  job_description?: string;
  job_type?: string;
  work_model?: string;
  start_on?: string; //or might be a date
  match_percent?: number; // is full_match_score
}

export interface Languages {
  name:string;
  proficieny:string;
}

export interface CandidateDetailsInterface {
  matches?: Matches[];
  candidate_id?: number;
  first_name?: string;
  last_name?: string;
  preferred_name?: string;
  // values_text?: string; //gone
  // related_experience?: string;
  // desired_job?: string;
  personality_description?: string; //gone
  street_address?: string; //gone
  house_number?: string; // gone
  postal_code?: number; // gone
  // city?: string;
  location_city?: string;
  phone_number_region?: number; //gone
  phone_number?: number; //gone
  // email_adress?: string;
  email?: string;
  birth_date?: number; //old name still there
  date_of_birth?: string;
  notice_period_months?: number;
  file_cv?: string; // gone
  preferred_work_id?: number; // gone
  accepted_privacy?: boolean;
  skip_tutorial?: boolean;
  preferred_work_model?: string; // gone
  country?: string; // gone
  work_permit?: string; // gone
  work_permission_CH?: string;
  status?: string;
  invited_by?: string;
  about_me?: string;
  hard_skills?: string[];
  soft_skills?: string[];
  industry?: string;
  experience?: string; // needs to change to string[]
  github?: string;
  linkedin?: string;
  education?: string | ""; // needs to be an array of object
  languages?: Languages[];
  gender?: string;
  ethnicity?: number;
  //initiative_badges?:string[];
  Initiatives?: string[];
  wanted_job_title?: string;
}
// {

//   "last_update": null,
//   "created_at": null,
//   "last_country": 227,
//   "invited_by": null
// }