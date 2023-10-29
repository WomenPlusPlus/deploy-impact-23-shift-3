export interface CandidateDetailsInterface {
    // first_name?: string | "";
    // last_name?: string | "";
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
    hard_skills?:string[];
    soft_skills?:string[];
    industry?: string;
    experience?: string; // needs to change to string[]
    github?: string;
    linkedin?: string;
    education?: string; // needs to be an array of object
    languages?: string[];
    gender?: string;
    ethnicity?: number;
  }
// {

//   "last_update": null,
//   "created_at": null,
//   "last_country": 227,
//   "invited_by": null
// }


  // changed to -- from swagger --
  // {
  // "url": "string",
  // "supabase_authenticaiton_uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  // "first_name": "string",
  // "last_name": "string",
  // "preferred_name": "string",
  // "about_me": "string",
  // "industry": "string",
  // "experience": "string",
  // "github": "string",
  // "linkedin": "string",
  // "birth_date": "2023-10-23",
  // "education": "string",
  // "location_city": "string",
  // "hard_skills": "string",
  // "languages": "string",
  // "soft_skills": "string",
  // "gender": "string",
  // "ethnicity": 2147483647,
  // "email": "string",
  // "date_of_birth": "2023-10-23",
  // "notice_period_months": 2147483647,
  // "accepted_privacy": true,
  // "skip_tutorial": true,
  // "last_update": "2023-10-23T10:27:09.034Z",
  // "created_at": "2023-10-23T10:27:09.034Z",
  // "work_permission_CH": "string",
  // "last_country": "string",
  // "invited_by": "string"
  // }