"use client";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import logo from "../../../public/images/logo.png";
import { HeaderAvatar } from "./headerAvatar";

import { useContext } from "react";
import { SignInProviderContext } from "@/components/providers/SignInProvider";

interface HeaderProps {
  initials: string;
}

export default function Header(props: HeaderProps) {
  const { auth } = useContext(SignInProviderContext);
  const loggedInUser = auth?.user;
  const first_name = loggedInUser?.first_name || "first";
  const last_name = loggedInUser?.last_name || "last";
  const preferred_name = loggedInUser?.preferred_name || "preferred name";
  const display_name = preferred_name || first_name + " " + last_name || "";

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#FFFCFA",
        position: "fixed",
        width: "100%",
        zIndex: 200,
      }}
    >
      <Toolbar
        sx={{
          borderColor: "divider",
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Box sx={{ ml: { xs: 1, sm: 6, md: 8 } }}>
              <Image src={logo} alt="Shift logo" />
            </Box>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Box sx={{ mr: { md: 8, xs: 1 }, display: "inline-block" }}>
              <HeaderAvatar
                first_name={first_name}
                last_name={last_name}
                preferred_name={preferred_name}
                display_name={display_name}
              />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </Paper>
  );
}
