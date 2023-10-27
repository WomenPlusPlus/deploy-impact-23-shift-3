"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Job from "@/components/site/candidateJobs/job";
import { SearchBar } from "@/app/(site)/company/searchBar";


export default function MyJobsPage() {
  return (
    <Container sx={{px:{xs:0}}}>
      <SearchBar />

      <Box
        sx={{
          mt:5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap:"wrap",
          gap:"20px"
        }}
      >

  <Job />
  <Job />
  <Job />
  <Job />
  <Job />
  <Job />
  <Job />
  <Job />
      </Box>
    </Container>
  );
}
