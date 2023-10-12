"use client";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import LoginForm from "@/app/(auth)/login/loginInForm";

export default function LogIn() {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 12,
        gap: 4,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" gutterBottom sx={{}}>
          Welcome to SHIFT!
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Card sx={{ borderRadius: 2, backgroundColor: "#FFFCFA" }}>
          <LoginForm />
        </Card>
      </Box>
    </Box>
  );
}
