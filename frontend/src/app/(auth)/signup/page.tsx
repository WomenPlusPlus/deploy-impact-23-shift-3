"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

import { Alert } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { redirect } from "next/navigation";

// query
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function SignUpPage() {
  // TODO: Temporary for layout, will change when react query is implemented
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [idError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signedIn, setSignedIn] = useState(false);

  // Mutations
  const mutation = useMutation({
    mutationFn: (newCredentials) => {
      return axios.post(
        "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/signup/",
        newCredentials,
      );
    },
  });

  // TODO: only temp until authentication and roles is fully working
  if (mutation.isSuccess) {
    console.log("successMsg", mutation.data.data.msg);
    // redirect("/candidate")
  }

  //TODO: is always returning 200 ok when there is an error needs changing (backend)
  if (mutation.isError) {
    console.log(mutation.data);
    // redirect("/candidate")
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form_email = data.get("email");
    const form_password = data.get("password");
    mutation.mutate({ email: form_email, password: form_password });
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        px: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        maxWidth: "80%",
      }}
    >
      <Typography component="h1" variant="h4" align="left">
        Welcome to SHIFT!
      </Typography>
      <Typography component="h3" variant="h5" align="left" sx={{ mt: 2 }}>
        Sign up
      </Typography>

      <Box
        component="form"
        // noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          type="email"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        {/* <Link href="/forgot" variant="body2" >
                  Forgot password?
                </Link> */}

        <Box sx={{ marginTop: "10px" }}>
          {mutation.isSuccess && (
            <Alert severity="error">{mutation.data.data.msg}</Alert>
          )}
        </Box>
        <Box sx={{ textAlign: "right", mb: 1 }}>
          <Button
            type="submit"
            // fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Divider variant="middle" />
        {/* <Copyright sx={{ mt: 5 }} /> */}

        <Grid container>
          <Grid item>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 5 }}
            >
              Already on SHIFT?{" "}
              <Link color="inherit" href="/signin">
                Sign in
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
