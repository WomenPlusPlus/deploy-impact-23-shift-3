import SubHeader from "@/components/site/subHeader";
import Container from "@mui/material/Container";

export const metadata = {
  title: "SHIFT - Candidate - Dashboard",
  description: "Shift_Enter App - Candidate - Dashboard",
};

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = [
    { title: "Dashboard", url: "/candidate", icon: "home" },
    { title: "My Jobs", url: "/candidate/my-jobs", icon: "jobs" },
    { title: "Companies", url: "/candidate/companies", icon: "company" },
    { title: "Profile", url: "/candidate/profile", icon: "profile" },
    { title: "Settings", url: "/candidate/settings", icon: "settings" },
  ];
  return (
    <>
      {/* candidate header */}
      <SubHeader sections={sections} title={""} />
      <Container component="main" sx={{ mt: 3, mb: 2 }} maxWidth="lg">
        {children}
      </Container>
    </>
  );
}
