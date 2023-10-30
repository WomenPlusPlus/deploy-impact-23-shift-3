import Grid from "@mui/material/Grid";
import React from "react";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

//import { JobPostNew } from "@/app/(site)/company/jobs/types";
// import { JobPostCard } from "@/app/(site)/company/jobs/jobPostCard";
import JobCard from "@/components/site/candidateJobs/jobCard";
import { Matches } from "@/components/site/candidateProfile/candidateInterface";

interface JobPostTypes {
  id: number;
  job_title: string;
  full_match_score: number;
  // to come i hope!
  job_description?: string;
  job_type?: string;
  work_model?: string;
  start_on?: string; //or might be a date
  match_percent?: number; // is full_match_score
  logo_src?: string;

  // job_id?: number;
  // logo_src?: string;
  // job_summary?: string;

  // id:number;
  // job_title:string;
  // full_match_score:number;
  // // to come i hope!
  // job_description?:string;
  // job_type?:string;
  // work_model?:string;
  // start_on?:string; //or might be a date
  // match_percent:number // is full_match_score
}

interface JobListProps {
  matches: JobPostTypes[];
}

const JobsList: React.FC<JobListProps> = ({ matches }) => {
  return (
    <Grid>
      {matches.length === 0 && (
        <Stack>
          <Typography>No jobs found</Typography>
        </Stack>
      )}

      {matches.map((match, index) => (
        <JobCard key={match.id} job_data={match} />
      ))}
    </Grid>
  );
};

export default JobsList;
