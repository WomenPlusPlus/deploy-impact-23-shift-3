"use client";

import * as React from "react";
import { useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
import { useQuery } from "@tanstack/react-query";
import Divider from "@mui/material/Divider";
import { Avatar, Button, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

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
      <Grid container sx={{ my: 3 }}>
        <Grid item sm={8}>
          <Typography variant="h5" component="h1">
            Your personal profile
          </Typography>

          <Typography variant="body1" component="p">
            Let us know you better and how can you be contacted for an opening
            position.
          </Typography>
        </Grid>

        <Grid item sx={{ textAlign: "right" }} sm={4}>
          <Button variant="outlined">Preview your profile</Button>
        </Grid>
      </Grid>

      {/* Secrion one Basic info  move to component */}
      <Paper sx={{ px: 3, py: 3, borderRadius: "16px" }} elevation={3}>
        <Box>
          <Typography component="h2" variant="h6">
            Basic info
          </Typography>
          <Typography component="p" variant="caption">
            Indicates required *
          </Typography>
        </Box>

        <Grid container my={3}>
          <Grid
            item
            sm={6}
            sx={{ paddingRight: "10px" }}
          >
            <TextField
              id={"first_name"}
              size={"small"}
              value={signInContext.auth?.user?.first_name || ""}
              label={"First Name *"}
              fullWidth
            />
          </Grid>

          <Grid
            item
            sm={6}
            sx={{ paddingLeft: "10px" }}
          >
            <TextField
              id={"last_name"}
              size={"small"}
              value={signInContext.auth?.user?.last_name || ""}
              label={"Last Name *"}
              fullWidth
            />
          </Grid>
        </Grid>

        <FormControl fullWidth variant="standard"></FormControl>
      </Paper>
      {/* Section one Basic info End */}
    </Container>
  );
}
