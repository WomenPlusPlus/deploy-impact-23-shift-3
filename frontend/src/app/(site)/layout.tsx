import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Header from "@/components/site/header"
import Footer from "./footer";
import { CssBaseline } from "@mui/material";

//for query

export const metadata = {
  title: "Shift",
  description: "Shift_Enter App",
};

const DRAWER_WIDTH = 240;

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}
  >
    <CssBaseline />
    <Header title={'Dashboard'} />
 

    {/* <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg"> */}
      {children}
    {/* </Container> */}

    <Footer />
  </Box>
  );
}
