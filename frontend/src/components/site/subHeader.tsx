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
import { usePathname, useRouter } from "next/navigation";

export type SubHeaderSection = {
  title: string;
  url: string;
  icon: "home" | "jobs" | "company" | "profile" | "settings" | "candidates";
};
interface HeaderProps {
  sections: SubHeaderSection[];
}

export default function SubHeader(props: HeaderProps) {
  let pathName = "";
  const fullPath = usePathname();
  const pathArray = fullPath.split("/");

  if (pathArray.length > 3) {
    pathName = `/${pathArray[1]}/${pathArray[2]}`;
  } else {
    pathName = fullPath;
  }

  const { sections } = props;
  const router = useRouter();
  const handleClick = (section: SubHeaderSection) => {
    router.replace(section.url);
  };
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
            key={section.title}
            variant="body2"
            underline="none"
            onClick={() => handleClick(section)}
            sx={
              section.url === pathName
                ? {
                    mx: { md: 3, sm: 2, xs: 0 },
                    display: "inline-block",
                    textAlign: "center",
                    borderBottom: "3px solid navy",
                    pb: 1,
                    color: "14366F",
                    cursor: "pointer",
                  }
                : {
                    mx: { md: 3, sm: 2, xs: 0 },
                    display: "inline-block",
                    textAlign: "center",
                    pb: 1,
                    color: "#49454F",
                    cursor: "pointer",
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
