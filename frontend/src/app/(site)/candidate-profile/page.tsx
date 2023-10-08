"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Avatar, FormControl } from "@mui/material";
import Box from "@mui/material/Box";

export const metadata = {
  title: "SHIFT - Candidate - profile",
  description: "Shift_Enter App - Candidate - Profile",
};
export default function CandidateProfilePage() {
  return (
    <Container>
      <Card sx={{ padding: "8px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Box>
            <Typography variant="h6">BASIC DETAILS</Typography>
          </Box>
          <Divider />
          <Box
            sx={{ display: "flex", gap: "56px" }}
            paddingX={"40px"}
            paddingY={"8px"}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                alt="Avatar"
                src="images/avatar.png"
                sx={{ width: 120, height: 120 }}
              />
            </Box>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <FormControl fullWidth variant="standard">
                <TextField
                  id={"name"}
                  size={"small"}
                  variant={"standard"}
                  label={"Name"}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
