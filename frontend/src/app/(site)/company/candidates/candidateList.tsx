import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { Candidate } from "@/app/(site)/company/candidates/candidateInterface";
import Button from "@mui/material/Button";

interface CandidateListProps {
  candidates: Candidate[];
}
export const CandidateList: React.FC<CandidateListProps> = ({
  candidates = [],
}) => {
  return (
    <Grid container spacing={2} padding={1} sx={{ overflowY: "auto" }}>
      {candidates.length === 0 && (
        <Box padding={3}>
          <Typography>No candidates found...</Typography>
        </Box>
      )}
      {candidates.map((candidate) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={4} key={1}>
            <Card
              sx={{
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: "12px",
                borderColor: "#102620",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginX: "16px",
                  marginY: "12px",
                }}
              >
                <Typography sx={{ fontSize: "16px", color: "#14366F" }}>
                  Job Position Name
                </Typography>
                <Button
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#63E5C5",
                    fontSize: "14px",
                    textTransform: "none",
                  }}
                >
                  95% match
                </Button>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginX: "16px",
                }}
              >
                <Typography sx={{ fontSize: "22px", color: "000" }}>
                  PREF NAME
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
