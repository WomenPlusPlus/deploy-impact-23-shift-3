"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SearchBar from "@/app/(site)/company/searchBar";
import { CandidateList } from "@/app/(site)/company/candidates/candidateList";
import { Candidate } from "@/app/(site)/company/candidates/candidateInterface";

const fakeCandidate: Candidate = {
  id: "1",
  preferred_name: "Name",
};
const fakeCandidate2: Candidate = {
  id: "1",
  preferred_name: "Name",
};
const fakeCandidate3: Candidate = {
  id: "1",
  preferred_name: "Name",
};
const fakeCandidate4: Candidate = {
  id: "1",
  preferred_name: "Name",
};
const fakeCandidate5: Candidate = {
  id: "1",
  preferred_name: "Name",
};

const fakeListOfCandidates: Candidate[] = [
  fakeCandidate,
  fakeCandidate2,
  fakeCandidate3,
  fakeCandidate4,
  fakeCandidate5,
];
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
        <CandidateList candidates={fakeListOfCandidates} />
      </Box>
    </Container>
  );
}
