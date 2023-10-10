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
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

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
        <Card>
          <Box sx={{ padding: 7 }}>
            <FormControl fullWidth>
              <TextField
                id={"email"}
                size={"small"}
                label={"Email"}
                sx={{ height: 4, marginBottom: 6 }}
              />
              <TextField
                id={"password"}
                size={"small"}
                label={"Password"}
                sx={{ height: 4, marginBottom: 6 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
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
        </Card>
      </Box>
    </Box>
  );
}
