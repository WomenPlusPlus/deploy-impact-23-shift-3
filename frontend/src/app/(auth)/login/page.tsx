"use client";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

export default function LogIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#FAF4EF",
        flexDirection: "column",
        padding: 12,
        gap: 4,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" gutterBottom sx={{}}>
          Welcome to SHIFT!
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Card sx={{ borderRadius: 2, backgroundColor: "#FFFCFA" }}>
          <Box sx={{ padding: 7 }}>
            <Box sx={{ paddingBottom: 1.5 }}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id={"email"}
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
            <Box sx={{ fontSize: "12px", paddingBottom: 4 }}>
              <Typography sx={{ fontSize: "12px" }}>
                By clicking Sign In you agree to the SHIFT
              </Typography>
              <Box>
                <Link
                  href="/"
                  sx={{
                    textDecoration: "underline",
                    color: "#14366F",
                  }}
                >
                  User Agreement, Privacy Policy
                </Link>
                <Typography
                  sx={{ fontSize: "12px", display: "inline", marginX: 1 }}
                >
                  and
                </Typography>
                <Link
                  href="/"
                  sx={{
                    textDecoration: "underline",
                    color: "#14366F",
                  }}
                >
                  Cookie Policy
                </Link>
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: "right",
                textDecoration: "underline",
                colour: "#14366F",
              }}
            >
              <Link href={"/login"} sx={{ fontSize: "16px", marginRight: 4 }}>
                Can't Log in?
              </Link>
              <Button variant="contained" sx={{ textTransform: "none" }}>
                Sign in
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
