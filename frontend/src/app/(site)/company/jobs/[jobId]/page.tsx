"use client";

import * as React from "react";
import { useContext } from "react";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
import { usePostedJobForCompany } from "@/lib/usePostedJobsForCompany";
import { CircularProgress, Stack } from "@mui/material";
import Container from "@mui/material/Container";
import { JobPreview } from "@/app/(site)/company/jobs/jobPreview";
import Typography from "@mui/material/Typography";

interface JobPageProps {
  params: {
    jobId: string;
  };
}

export default function JobPage(props: JobPageProps) {
  const jobId = props.params.jobId;
  const signInContext = useContext(SignInProviderContext);
  const companyId = signInContext.auth?.user?.id;
  const { isLoading, isFetched, isError, data } = usePostedJobForCompany(
    companyId,
    jobId,
  );

  return (
    <Container>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        {isLoading && <CircularProgress />}
        {isFetched && data && <JobPreview jobPost={data} />}
        {isFetched && !data && <Typography>No data found</Typography>}
      </Stack>
    </Container>
  );
}
