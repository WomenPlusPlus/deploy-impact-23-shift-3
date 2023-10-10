"use client";
import AppBar from "@mui/material/AppBar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import { Interface } from "readline"

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
    icon: string;
  }>;
}

export default function SubHeader(props: HeaderProps) {
  const { sections, title } = props;
  //TODO: add title to props so can use it to determine current page
  return (
    <Container>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: "space-between",
          borderBottom: 2,
          borderColor: "divider",
          mt: 3,
        }}
      >
        {sections.map((section) => (
          <Link
            className="selected"
            color="inherit"
            key={section.title}
            variant="body2"
            underline="none"
            href={section.url}
            sx={{ mx: 3, mb: 2, display: "inline-block", textAlign: "center" }}
          >
            <Container>
              {section.icon === "home" ? (
                <HomeIcon color="inherit" sx={{ display: "inline-block" }} />
              ) : null}
              {section.icon === "jobs" ? (
                <WorkIcon color="inherit" sx={{ display: "inline-block" }} />
              ) : null}
              {section.icon === "company" ? (
                <BusinessIcon
                  color="inherit"
                  sx={{ display: "inline-block" }}
                />
              ) : null}
              {section.icon === "profile" ? (
                <PersonIcon color="inherit" sx={{ display: "inline-block" }} />
              ) : null}
              {section.icon === "settings" ? (
                <SettingsIcon
                  color="inherit"
                  sx={{ display: "inline-block" }}
                />
              ) : null}
            </Container>

            {section.title}
          </Link>
        ))}
      </Toolbar>
    </Container>
  );
}
