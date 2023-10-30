"use client";
import * as React from "react";
import { useContext, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { SearchBar } from "@/app/(site)/company/searchBar";
import { CandidateList } from "@/app/(site)/company/candidates/candidateList";
import Fuse from "fuse.js";
import { useMatchedCandidates } from "@/app/(site)/company/candidates/useMatchedCandidates";
import { CandidateForJobList } from "@/app/(site)/company/candidates/types";
import { CircularProgress } from "@mui/material";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
import IFuseOptions = Fuse.IFuseOptions;

const options: IFuseOptions<CandidateForJobList> = {
  includeScore: true,
  shouldSort: true,
  findAllMatches: true,
  threshold: 0,
  keys: ["job_title", "full_match_score", "soft_skills", "hard_skills", "name"],
};

export default function CandidatesPage(ctx: any) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const jobId = ctx.searchParams.jobid || "all";
  const signInContext = useContext(SignInProviderContext);
  const { data: listOfCandidates = [], isLoading } = useMatchedCandidates(
    jobId,
    signInContext.auth?.user?.id as string,
  );
  const filteredCandidates = useMemo(() => {
    const fuse = new Fuse(listOfCandidates, options);
    return fuse.search(searchTerm, { limit: 20 });
  }, [listOfCandidates, searchTerm]);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "-20px 0 0 0",
          gap: 4,
        }}
      >
        {listOfCandidates.length > 0 && (
          <SearchBar
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            placeholder={"Search for candidates"}
          />
        )}
        {isLoading ? (
          <CircularProgress />
        ) : (
          <CandidateList
            candidates={
              searchTerm
                ? filteredCandidates.map((fuse) => fuse.item)
                : listOfCandidates
            }
          />
        )}
      </Box>
    </Container>
  );
}
