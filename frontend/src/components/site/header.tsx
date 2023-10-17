"use client";
import AppBar from "@mui/material/AppBar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";

import logo from "../../../public/images/logo.png";

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  //TODO: get first letter of first name, last name save to variable
  const { title } = props;

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
      {/* <Paper elevation={3} sx={{ backgroundColor: "#FFFCFA"}}> */}
      <Toolbar
        sx={{
          borderColor: "divider",
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Box sx={{ ml: {xs:1, sm:6, md:8} }}>
              <Image src={logo} alt="Shift logo" />
            </Box>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Box sx={{ mr:{md:8, xs:1} , display: "inline-block" }}>
              <Box
                sx={{
                  mr: 1,
                  display: "inline-block",
                  borderRadius: "50%",
                  background: "#14366F",
                  height: "32px",
                  width: "32px",
                  color: "white",
                  textAlign: "center",
                  lineHeight: "32px",
                }}
              >
                <Typography sx={{ lineHeight: "32px" }}>JS</Typography>
              </Box>{" "}
              <Link underline="none" color="primary" href="/signin" sx={{}}>
                Sign out
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </Paper>
  );
}
