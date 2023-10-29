import Grid from "@mui/material/Grid";
import React from "react";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { JobPost } from "@/app/(site)/company/jobs/types";
import { JobPostCard } from "@/app/(site)/company/jobs/jobPostCard";

interface JobListProps {
  jobPosts: JobPost[];
}
export const JobList: React.FC<JobListProps> = ({ jobPosts }) => {
  return (
    <Grid container spacing={2} padding={1} sx={{ overflowY: "auto" }}>
      {jobPosts.length === 0 && (
        <Stack>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "400",
              lineHeight: "32px",
            }}
          >
            No job posted yet
          </Typography>
          <Typography>
            Start creating jobs by clicking in “Create new job” button.
          </Typography>
        </Stack>
      )}
      {jobPosts.map((jobPost, index) => (
        <JobPostCard key={index + jobPost.job_id} job={jobPost} />
      ))}
    </Grid>
  );
};
