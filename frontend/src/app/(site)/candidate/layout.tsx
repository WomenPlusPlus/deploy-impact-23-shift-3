
import SubHeader from "@/components/site/subHeader"
import Container from "@mui/material/Container"

export const metadata = {
  title: "SHIFT - Candidate - profile",
  description: "Shift_Enter App - Candidate - Dashboard",
}

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sections = [
    { title: 'Dashboard', url: '/candidate' },
    { title: 'Jobs', url: '#' },
    { title: 'Companies', url: '#' },
    { title: 'Profile', url: '#' },
    { title: 'Settings', url: '#' },
  ];
  return <>
  {/* candidate header */}
  <SubHeader sections={sections} />
  <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
              {children}
            </Container>

  
  </>
}
