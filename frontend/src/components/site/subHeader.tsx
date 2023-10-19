"use client";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { usePathname } from "next/navigation";

export type SubHeaderSection = {
  title: string;
  url: string;
  icon: "home" | "jobs" | "company" | "profile" | "settings" | "candidates";
};
interface HeaderProps {
  sections: SubHeaderSection[];
}

export default function SubHeader(props: HeaderProps) {
  const pathName = usePathname();

  const { sections } = props;

  return (
    <Container>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: "space-between",
          borderBottom: 2,
          borderColor: "#D7DDE7",
          mt: 10,
        }}
      >
        {sections.map((section) => (
          <Link
            color="primary"
            key={section.title}
            variant="body2"
            underline="none"
            href={section.url}
            sx={
              section.url === pathName
                ? {
                    mx: { md: 3, sm: 2, xs: 0 },
                    display: "inline-block",
                    textAlign: "center",
                    borderBottom: "3px solid navy",
                    pb: 1,
                  }
                : {
                    mx: { md: 3, sm: 2, xs: 0 },
                    display: "inline-block",
                    textAlign: "center",
                    pb: 1,
                  }
            }
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
              {section.icon === "candidates" ? (
                <PeopleAltIcon
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