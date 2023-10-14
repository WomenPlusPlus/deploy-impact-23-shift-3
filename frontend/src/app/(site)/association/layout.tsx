import SubHeader, { SubHeaderSection } from "@/components/site/subHeader";
import Container from "@mui/material/Container";

export const metadata = {
  title: "SHIFT - Association - profile",
  description: "Shift_Enter App - Association - Dashboard",
};

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections: SubHeaderSection[] = [
    { title: "Dashboard", url: "/association", icon: "home" },
    { title: "Candidates", url: "#", icon: "jobs" },
    { title: "Companies", url: "#", icon: "company" },
    { title: "Profile", url: "#", icon: "profile" },
    { title: "Settings", url: "#", icon: "settings" },
  ];
  return (
    <>
      {/* candidate header */}
      <SubHeader sections={sections} />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        {children}
      </Container>
    </>
  );
}
