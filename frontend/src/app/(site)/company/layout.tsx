"use client";
import SubHeader, { SubHeaderSection } from "@/components/site/subHeader";
import Container from "@mui/material/Container";
import { Guard } from "@/components/providers/SignInProvider";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections: SubHeaderSection[] = [
    { title: "Home", url: "/company", icon: "home" },
    { title: "Open positions", url: "/company/jobs", icon: "jobs" },
    { title: "Candidates", url: "/company/candidates", icon: "candidates" },
    { title: "Profile", url: "/company/profile", icon: "profile" },
    { title: "Settings", url: "/company/settings", icon: "settings" },
  ];

  return (
    <Guard role={"company_user"}>
      <SubHeader sections={sections} />
      <Container component="main" sx={{ mt: 6, mb: 2 }} maxWidth="lg">
        {children}
      </Container>
    </Guard>
  );
}
