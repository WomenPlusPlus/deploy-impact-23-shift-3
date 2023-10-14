import SubHeader, { SubHeaderSection } from "@/components/site/subHeader";
import Container from "@mui/material/Container";

export const metadata = {
  title: "SHIFT - Company - profile",
  description: "Shift_Enter App - Company - Dashboard",
};

export default function ForgotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections: SubHeaderSection[] = [
    { title: "Dashboard", url: "/company", icon: "home" },
    { title: "Jobs", url: "#", icon: "jobs" },
    { title: "Candidates", url: "#", icon: "company" },
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
