import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const metadata = {
  title: "SHIFT - Candidate - profile",
  description: "Shift_Enter App - Candidate - Profile",
};
export default function CandidateProfilePage() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 5 }}>
          Candidate Profile
        </Typography>
      </Box>
    </Container>
  );
}
