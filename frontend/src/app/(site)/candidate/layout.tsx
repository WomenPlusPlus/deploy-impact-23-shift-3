import SubHeader from "@/components/site/subHeader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import backgroundImg1 from "../../../../public/images/site-background-1.png";

const img = "../../../../public/images/site-background-1.png"

export const metadata = {
  title: "SHIFT - Candidate - Home",
  description: "Shift_Enter App - Candidate - Dashboard",
};

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = [
    { title: "Home", url: "/candidate", icon: "home" },
    { title: "My Jobs", url: "/candidate/my-jobs", icon: "jobs" },
    { title: "Companies", url: "/candidate/companies", icon: "company" },
    { title: "Profile", url: "/candidate/profile", icon: "profile" },
    { title: "Settings", url: "/candidate/settings", icon: "settings" },
  ];
  return (
    <Box>
      {/* candidate header */}
      <SubHeader sections={sections} title={""} />
      <Container component="main" sx={{ mt: 3, mb: 2 }} maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
}
