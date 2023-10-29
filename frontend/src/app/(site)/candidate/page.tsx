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
        <Typography variant="h5" component="h1" gutterBottom sx={{ mt: 1 }}>
          Candidate Home
        </Typography>
      </Box>
    </Container>
  );
}
