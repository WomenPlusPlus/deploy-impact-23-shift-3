import SubHeader from "@/components/site/subHeader";
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
  const sections = [
    { title: "Dashboard", url: "/association", icon: "home" },
    { title: "Candidates", url: "/association/candidates", icon: "candidates" },
    { title: "Companies", url: "/association/companies", icon: "company" },
    { title: "Profile", url: "/association/profile", icon: "profile" },
    { title: "Settings", url: "/association/settings", icon: "settings" },
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
