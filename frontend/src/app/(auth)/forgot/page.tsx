"use client";
import Box from "@mui/material/Box";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";

export default function ForgottenPassword() {
  const [email, setEmail] = useState("");

  return (
    <Box
      component="form"
      sx={{
        padding: 7,
        display: "flex",
        flexDirection: "column",
        minWidth: "500px",
      }}
    >
      <Box sx={{ paddingBottom: 1.5 }}>
        <FormControl fullWidth variant="outlined">
          <TextField
            id={"email"}
            value={email}
            type={"text"}
            label={"Email"}
            variant={"outlined"}
            sx={{ height: 4, marginBottom: 8 }}
          />
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ textTransform: "none", borderRadius: "100px", marginTop: 4 }}
          >
            Reset password
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
