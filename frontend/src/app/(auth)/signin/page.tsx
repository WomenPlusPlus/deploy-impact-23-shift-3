"use client";

import * as React from "react";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Alert } from "@mui/material";
import Typography from "@mui/material/Typography";

// query
import axios, { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  Authentication,
  SignInProviderContext,
} from "@/components/providers/SignInProvider";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const signInContext = useContext(SignInProviderContext);
  const [error, setError] = useState<Error | null>(null);
  // Mutations
  const mutation = useMutation({
    mutationFn: (newCredentials: {
      email: string | null;
      password: string | null;
    }) => {
      return axios.post(
        "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/login/",
        newCredentials,
      );
    },
    onError: (error: Error) => {
      setError(error as Error);
    },
    onSuccess: (
      response: AxiosResponse<{
        access_token: string;
        user: object;
      }>,
    ) => {
      console.log(response.data);
      signInContext.setAuth({
        authenticated: true,
        access_token: response.data.access_token,
        user: response.data.user as Authentication["user"],
      });
      router.push("/candidate");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data);
    const form_email = data.get("email") as string;
    const form_password = data.get("password") as string;

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
        Sign in
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

        <Link href="/forgot" variant="body2">
          Forgot password?
        </Link>

        <Box sx={{ marginTop: "10px" }}>
          {error && <Alert severity="error">{mutation.error.response.data.error_description}</Alert>}
        </Box>
        <Box sx={{ textAlign: "right", mb: 1 }}>
          <Button
            type="submit"
            // fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
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
              Not already on SHIFT?{" "}
              <Link color="inherit" href="/signup?emailhere.co.uk">
                Sign up
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
