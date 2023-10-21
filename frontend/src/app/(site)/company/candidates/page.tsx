"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SearchBar from "@/app/(site)/company/searchBar";
import getListOfCandidates from "@/app/(site)/company/candidates/fetchMatchedCandidates";
import { CandidateList } from "@/app/(site)/company/candidates/candidateList";

export default function CandidatesPage() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "-20px 0 0 0",
        }}
      >
        <SearchBar />
        <CandidateList candidates={getListOfCandidates()} />
      </Box>
    </Container>
  );
}
