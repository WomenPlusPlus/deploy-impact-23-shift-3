"use client";
import SubHeader, { SubHeaderSection } from "@/components/site/subHeader";
import Container from "@mui/material/Container";
import { Guard } from "@/components/providers/SignInProvider";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections: SubHeaderSection[] = [
    { title: "Home", url: "/association", icon: "home" },
    { title: "Candidates", url: "/association/candidates", icon: "candidates" },
    { title: "Companies", url: "/association/companies", icon: "company" },
    { title: "Profile", url: "/association/profile", icon: "profile" },
    { title: "Settings", url: "/association/settings", icon: "settings" },
  ];
  return (
    <Guard role={"association_user"}>
      <SubHeader sections={sections} />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        {children}
      </Container>
    </Guard>
  );
}
