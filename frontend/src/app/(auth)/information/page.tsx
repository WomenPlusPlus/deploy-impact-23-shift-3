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
          <h4>What steps should I follow if I want to use the platform?</h4>
        </Typography>
      </Box>
    </Box>
  );
}
