"use client";

import * as React from "react";
import { useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
import { useQuery } from "@tanstack/react-query";
import Divider from "@mui/material/Divider";
import { Avatar, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { fetchCandidate } from "@/lib/fetch-candidate";

export default function ProfilePage() {
  // useContext is a Hook in react. It is a way to pass data through the component tree without having to pass props down manually at every level.
  const signInContext = useContext(SignInProviderContext);
  // useQuery is a Hook provided by the React Query library, and it is used for fetching and managing data in React applications.
  // firstParam: key
  //secondParam: The function that performs the data-fetching operation. This function should return a Promise that resolves to the data you want to retrieve
  //thirdParam: optional configuration object that allows you to customize the behavior of the query. (for more info read doc)
  const { data } = useQuery(
    ["candidates", signInContext.auth?.user?.id],
    () => fetchCandidate(signInContext.auth?.user?.id),
    {
      enabled: !!signInContext.auth?.user?.id,
    },
  );

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
