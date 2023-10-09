
import SubHeader from "@/components/site/subHeader"
import Container from "@mui/material/Container"

export const metadata = {
  title: "SHIFT - Candidate - Dashboard",
  description: "Shift_Enter App - Candidate - Dashboard",
}

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sections = [
    { title: 'Dashboard', url: '/candidate' },
    { title: 'My Jobs', url: '/candidate/my-jobs' },
    { title: 'Companies', url: 'companies' },
    { title: 'Profile', url: 'profile' },
    { title: 'Settings', url: 'settings' },
  ];
  return <>
  {/* candidate header */}
  <SubHeader sections={sections} />
  <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
              {children}
            </Container>

  
  </>
}
