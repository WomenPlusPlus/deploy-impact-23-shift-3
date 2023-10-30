"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const containerStyle = {
    flex: "1",
    backgroundImage: 'url("/images/Bcg-auth.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  };

  const textStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 10,
    color: "#FFF",
    textTransform: "uppercase",
    fontSize: "57px",
    fontWeight: 600,
  };

  const contentStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 4,
    height: "100vh",
  };

  const cardStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 12,
    gap: 4,
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", background: "#FAF4EF" }}>
      <Box sx={containerStyle}>
        <Typography sx={textStyle}>
          Let’s connect, learn and innovate in tech. Let’s shift
        </Typography>
      </Box>
      <Box sx={contentStyle}>
        <Box sx={cardStyle}>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h4" gutterBottom>
              Welcome to SHIFT!
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Card sx={{ borderRadius: 2, backgroundColor: "#FFFCFA" }}>
              {children}
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RootLayout;
