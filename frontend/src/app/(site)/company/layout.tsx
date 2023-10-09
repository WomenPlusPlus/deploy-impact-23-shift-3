
import SubHeader from "@/components/site/subHeader"
import Container from "@mui/material/Container"

export const metadata = {
  title: "SHIFT - Company - profile",
  description: "Shift_Enter App - Company - Dashboard",
}

export default function ForgotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sections = [
    { title: 'Dashboard', url: '/company' },
    { title: 'Jobs', url: '#' },
    { title: 'Candidates', url: '#' },
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
