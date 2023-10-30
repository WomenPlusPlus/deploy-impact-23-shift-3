"use client";
import * as React from "react";
import { useContext, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { SearchBar } from "@/app/(site)/company/searchBar";
import { JobList } from "@/app/(site)/company/jobs/jobList";
import Button from "@mui/material/Button";
import { usePostedJobs } from "@/app/(site)/company/jobs/usePostedJobs";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
import { CircularProgress } from "@mui/material";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const signInContext = useContext(SignInProviderContext);
  const { data: jobPostsList = [], isLoading } = usePostedJobs(
    signInContext.auth?.user?.id as string,
  );

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "-20px 0 0 0",
          gap: "36px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {jobPostsList.length > 0 && (
            <SearchBar
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
              placeholder={"Search for job post"}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ textTransform: "none", borderRadius: "100px" }}
          >
            + Create new job
          </Button>
        </Box>
        {isLoading ? <CircularProgress /> : <JobList jobPosts={jobPostsList} />}
      </Box>
    </Container>
  );
}
