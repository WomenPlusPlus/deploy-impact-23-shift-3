"use client";
import SubHeader, { SubHeaderSection } from "@/components/site/subHeader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Guard } from "@/components/providers/SignInProvider";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections: SubHeaderSection[] = [
    { title: "Home", url: "/candidate", icon: "home" },
    { title: "Jobs", url: "/candidate/jobs", icon: "jobs" },
    { title: "Companies", url: "/candidate/companies", icon: "company" },
    { title: "Profile", url: "/candidate/profile", icon: "profile" },
    { title: "Settings", url: "/candidate/settings", icon: "settings" },
  ];
  return (
    <Guard role={"candidate"}>
      <Box>
        <SubHeader sections={sections} />
        <Container component="main" sx={{ mt: 3, mb: 2 }} maxWidth="lg">
          {children}
        </Container>
      </Box>
    </Guard>
  );
}
