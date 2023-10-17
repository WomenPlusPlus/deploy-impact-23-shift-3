"use client";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import logo from "../../../public/images/logo.png";

interface HeaderProps {
  initials: string;
}

export default function Header(props: HeaderProps) {
  //TODO: get first letter of first name, last name save to variable
  const { initials } = props;

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
                <Typography sx={{ lineHeight: "32px" }}>{props.initials}</Typography>
              </Box>{" "}
              <Link underline="none" color="primary" href="/login" sx={{}}>
                Sign out
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </Paper>
  );
}
