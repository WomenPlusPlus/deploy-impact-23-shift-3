"use client";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";

export default function Information() {
  return (
    <Box
      component="form"
      sx={{
        padding: 7,
        display: "flex",
        flexDirection: "column",
        minWidth: "500px",
      }}
    >
      <Box sx={{ paddingBottom: 1.5 }}>
        <Typography sx={{ fontSize: "20px" }}>
          <Typography>
            Our platform is exclusively for invited users. To gain access,
            you'll need to be invited by our association. Once you receive an
            invitation email, simply follow the link to the signup page, where
            you can create your password and start enjoying the benefits of our
            platform.
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
