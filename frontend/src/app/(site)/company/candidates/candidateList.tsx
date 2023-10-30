import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React from "react";
import { CandidateForJobList } from "@/app/(site)/company/candidates/types";
import { Stack } from "@mui/material";
import { CandidateCard } from "@/app/(site)/company/candidates/candidateCard";

interface CandidateListProps {
  candidates: CandidateForJobList[];
}
export const CandidateList: React.FC<CandidateListProps> = ({ candidates }) => {
  return (
    <Grid container spacing={2} padding={1} sx={{ overflowY: "auto" }}>
      {candidates.length === 0 && (
        <Stack>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "400",
              lineHeight: "32px",
            }}
          >
            No candidates found
          </Typography>
          <Typography>
            Start creating jobs in the 'Open Positions' tab.
          </Typography>
        </Stack>
      )}

      {candidates.map((candidate, index) => (
        <CandidateCard key={index} candidate={candidate} />
      ))}
    </Grid>
  );
};
