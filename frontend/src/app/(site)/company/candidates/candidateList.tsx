import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Avatar, CardHeader, CardMedia } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { Candidate } from "@/app/(site)/company/candidates/candidateInterface";

interface CandidateListProps {
  candidates: Candidate[];
}
export const CandidateList: React.FC<CandidateListProps> = ({
  candidates = [],
}) => {
  return (
    <Grid container spacing={2} padding={1} sx={{ overflowY: "auto" }}>
      {candidates.length === 0 && (
        <Box padding={2}>
          <Typography>No candidates found...</Typography>
        </Box>
      )}
      {candidates.map((candidate) => {
        return (
          <Grid item lg={4} key={1}>
            <Card
              sx={{
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardMedia component="img" height="194" />

              <CardHeader
                avatar={
                  <Avatar
                    sx={{ backgroundColor: "red" }}
                    aria-label="recipe"
                  ></Avatar>
                }
              />
              <CardContent
                sx={{
                  display: "flex",
                  flex: "1",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  kkkkk
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
