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
      <Box sx={{ padding: 2 }}>
        <Typography>
          <Typography variant="h6" sx={{ paddingBottom: 1 }}>
            User Agreement
          </Typography>
          <Typography sx={{ paddingBottom: 2 }}>
            By using our platform, you agree to abide by our terms and
            guidelines.
          </Typography>
          <Typography variant="h6" component="h6" sx={{ paddingBottom: 1 }}>
            Privacy Policy
          </Typography>
          <Typography sx={{ paddingBottom: 2 }}>
            We are committed to protecting your personal information and
            maintaining your privacy. Your data is safe with us.
          </Typography>
          <Typography variant="h6" component="h6" sx={{ paddingBottom: 1 }}>
            Cookie Policy
          </Typography>
          <Typography>
            Our website uses cookies to enhance your browsing experience and
            provide personalized content. You can manage your cookie preferences
            in your settings.
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
