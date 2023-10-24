"use client";

import * as React from "react";
import { useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
import Divider from "@mui/material/Divider";
import { Avatar, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";

export default function ProfilePage() {
  const signInContext = useContext(SignInProviderContext);

  return (
    <Container>
      <Card sx={{ padding: "8px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Box>
            <Typography variant="h6">BASIC DETAILS ....</Typography>
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
                  id={"email"}
                  size={"small"}
                  value={""}
                  variant={"standard"}
                  label={"Email"}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
