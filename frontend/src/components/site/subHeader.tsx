"use client";
import AppBar from "@mui/material/AppBar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import { Interface } from "readline"

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
}

export default function SubHeader(props: HeaderProps) {
  const { sections, title } = props;
  //TODO: add title to props so can use it to determine current page
  return (
    <Toolbar
      component="nav"
      variant="dense"
      sx={{
        justifyContent: "space-between",
        overflowX: "auto",
        maxWidth: "80%",
        borderBottom: 1,
        borderColor: "divider",
        mx: "auto",
      }}
    >
      {sections.map((section) => (
        <Link
          color="inherit"
          key={section.title}
          variant="body2"
          underline="none"
          href={section.url}
          sx={{ mx: 3, display: "inline-block", maxWidth: "50%" }}
        >
          {section.title}
        </Link>
      ))}
    </Toolbar>
  );
}
