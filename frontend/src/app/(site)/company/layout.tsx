import SubHeader, { SubHeaderSection } from "@/components/site/subHeader";
import Container from "@mui/material/Container";

export const metadata = {
  title: "SHIFT - Company - profile",
  description: "Shift_Enter App - Company - Dashboard",
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections: SubHeaderSection[] = [
    { title: "Home", url: "/company", icon: "home" },
    { title: "Jobs", url: "/company/jobs", icon: "jobs" },
    { title: "Candidates", url: "/company/candidates", icon: "candidates" },
    { title: "Profile", url: "/company/profile", icon: "profile" },
    { title: "Settings", url: "/company/settings", icon: "settings" },
  ];

  return (
    <>
      <SubHeader sections={sections} />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        {children}
      </Container>
    </>
  );
}
