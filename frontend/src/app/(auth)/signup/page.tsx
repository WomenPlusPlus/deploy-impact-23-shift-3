"use client";
import Box from "@mui/material/Box";
import * as React from "react";
import { useState } from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LinksSection from "@/app/(auth)/privacyLinks";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
  };
  const router = useRouter();
  const handleLoginClick = () => {
    router.replace("/login");
  };
  const handleCanNotSignInClick = () => {
    router.replace("/information");
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
            disabled
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
      <Box sx={{ paddingBottom: 1.5 }}>
        <Typography sx={{ fontSize: "12px" }}> Your password must:</Typography>
        <ul
          style={{
            fontSize: "12px",
            marginTop: 0,
            marginBottom: 0,
            paddingLeft: "16px",
          }}
        >
          <li>Have a minimum of eight (8) characters</li>
          <li>Contain at least one (1) uppercase letter</li>
          <li>Contain at least one (1) number</li>
          <li>Have at least one (1) uppercase letter (A-Z)</li>
          <li>Have at least one (1) lowercase letter (a-z)</li>
          <li>Contain at least one (1) special character (-‘-/&%$^*)</li>
        </ul>
      </Box>
      <LinksSection />
      <Box
        sx={{
          textAlign: "right",
          textDecoration: "underline",
          colour: "#14366F",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ textTransform: "none", borderRadius: "100px" }}
        >
          Sign in
        </Button>
      </Box>
      <Divider sx={{ paddingTop: 3 }} />
      <Box sx={{ paddingTop: 3, display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontSize: "16px" }}>Already on SHIFT?</Typography>
        <Link
          onClick={handleLoginClick}
          sx={{
            fontSize: "16px",
            color: "#14366F",
            marginLeft: 2,
            cursor: "pointer",
          }}
        >
          Log in
        </Link>
        <Box sx={{ marginLeft: "auto" }}>
          <Link
            onClick={handleCanNotSignInClick}
            sx={{ fontSize: "16px", cursor: "pointer" }}
          >
            Can't Sign in?
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
