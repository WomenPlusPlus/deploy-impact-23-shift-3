"use client";
import * as React from "react";
import { useContext } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Avatar, FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
import { useQuery } from "@tanstack/react-query";

const fetchCandidate = async (id?: string) => {
  const response = await fetch(
    `https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/candidates/`,
  );
  // @ts-ignore
  return response.json()[0];
  // return fetch(
  //   `https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/candidates/${id}/`,
  // );
};
export default function CandidateProfilePage() {
  const signInContext = useContext(SignInProviderContext);
  const { data } = useQuery(
    ["candidates", signInContext.auth?.user?.id],
    () => fetchCandidate(signInContext.auth?.user?.id),
    {
      enabled: !!signInContext.auth?.user?.id,
    },
  );
  console.log(data);
  const signingContext = useContext(SignInProviderContext);
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
                  id={"email"}
                  size={"small"}
                  value={signingContext.auth?.user?.email || ""}
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
