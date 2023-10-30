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
import { FormEvent, MouseEvent, useState } from "react";
import Link from "@mui/material/Link";
import LinksSection from "@/app/(auth)/privacyLinks";
import Button from "@mui/material/Button";
import { useLogin } from "@/lib/useLogin";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, loginError, isLoading] = useLogin();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    login(data);
  };
  const router = useRouter();
  const handleForgotPasswordClick = () => {
    router.replace("/forgot");
  };
  const handleCanNotLogInClick = () => {
    router.replace("/signup");
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
          onClick={handleForgotPasswordClick}
          sx={{
            textDecoration: "underline",
            color: "#14366F",
            paddingTop: "12px",
            paddingBottom: "12px",
            cursor: "pointer",
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
        <Link
          onClick={handleCanNotLogInClick}
          sx={{ fontSize: "16px", marginRight: 4, cursor: "pointer" }}
        >
          Can't Log in?
        </Link>
        <Button
          disabled={isLoading}
          type="submit"
          variant="contained"
          size="large"
          sx={{ textTransform: "none", borderRadius: "100px" }}
        >
          Log in
        </Button>
      </Box>
      {loginError ? (
        <Box sx={{ paddingTop: 5 }}>
          <Alert severity="error">{loginError.message}</Alert>
        </Box>
      ) : null}
    </Box>
  );
}
