"use client";

import {
  Alert,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Box from "@mui/material/Box";
import * as React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";
import LinksSection from "@/app/(auth)/privacyLinks";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";

interface Credentials {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: async (credentials: Credentials) => {
      const response = await fetch(
        "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        },
      );

      if (response.status === 500) {
        throw new Error("Login failed")!;
      }
      if (response.status >= 300) {
        try {
          const errorResponse = await response.json();
          throw new Error(errorResponse?.error_description || "Login failed!");
        } catch (error) {
          throw error;
        }
      }

      return await response.json();
    },
    onError: () => {},
    onSuccess: () => {},
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    mutation.mutate(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ padding: 7, minWidth: "500px" }}
    >
      <Box sx={{ paddingBottom: 1.5 }}>
        <FormControl fullWidth variant="outlined">
          <TextField
            id={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type={"text"}
            label={"Email"}
            variant={"outlined"}
            sx={{ height: 4, marginBottom: 8 }}
          />
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Box>
      <Box sx={{ paddingBottom: 1.5, fontSize: "16px" }}>
        <Link
          href="/forgot"
          sx={{
            textDecoration: "underline",
            color: "#14366F",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          Forgot password?
        </Link>
      </Box>
      <LinksSection />
      <Box
        sx={{
          textAlign: "right",
          textDecoration: "underline",
          colour: "#14366F",
        }}
      >
        <Link href={"/signup"} sx={{ fontSize: "16px", marginRight: 4 }}>
          Can't Log in?
        </Link>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ textTransform: "none" }}
        >
          Log in
        </Button>
      </Box>
      {mutation.error ? (
        <Box sx={{ paddingTop: 5 }}>
          <Alert severity="error">error</Alert>
        </Box>
      ) : null}
    </Box>
  );
}