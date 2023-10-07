import * as React from "react"
import Link from "next/link"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import HomeIcon from "@mui/icons-material/Home"
import StarIcon from "@mui/icons-material/Star"
import ChecklistIcon from "@mui/icons-material/Checklist"
import SettingsIcon from "@mui/icons-material/Settings"
import SupportIcon from "@mui/icons-material/Support"
import LogoutIcon from "@mui/icons-material/Logout"
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import Header from "./header"
import Footer from "./footer"
import { CssBaseline } from "@mui/material"

//for query
import TanStackProvider from '@/components/providers/TanStackProvider'

export const metadata = {
  title: "Shift",
  description: "Shift_Enter App",
}

const DRAWER_WIDTH = 240

// const NAV_LINKS = [
//   { text: "Home", href: "/", icon: HomeIcon },
//   { text: "sign out", href: "/signin", icon: StarIcon },
//   { text: "candidate", href: "/candidate", icon: ChecklistIcon },
//   { text: "company", href: "/company", icon: ChecklistIcon },
// ]

// const SUB_NAV_LINKS = [
//   { text: "Settings", icon: SettingsIcon },
//   { text: "Support", icon: SupportIcon },
//   { text: "Logout", icon: LogoutIcon },
// ]

export default function RootLayout({children}: {children: React.ReactNode}) {

  const sections = [
    { title: 'Dashboard', url: '/candidate' },
    { title: 'Jobs', url: '#' },
    { title: 'Companies', url: '#' },
    { title: 'Profile', url: '#' },
    { title: 'Settings', url: '#' },
  ];

  return (
    <html lang="en">
      <body>
      <TanStackProvider>
        <ThemeRegistry>
  
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <CssBaseline />
            <Header sections={sections} title={'Dashboard'} />

            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
              {children}
            </Container>

            <Footer />
          </Box>
         
        </ThemeRegistry>
        </TanStackProvider>
      </body>
    </html>
  )
}
