"use client";
import * as React from "react";
import { useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SignInProviderContext } from "@/components/providers/SignInProvider";

export default function CandidatePage() {
  const signInContext = useContext(SignInProviderContext);
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
          Candidate Dashboard
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The dashboard will be here but not sure how that will look yet!
        </Typography>
        <Typography variant="body1">Coming soon...</Typography>
        <pre>{JSON.stringify(signInContext.auth.user, null, 2)}</pre>
      </Box>
    </Container>
  );
}
