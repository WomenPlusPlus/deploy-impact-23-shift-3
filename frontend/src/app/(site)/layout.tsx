import * as React from "react";
import Box from "@mui/material/Box";

import Header from "@/components/site/header";
import Footer from "@/components/site/footer";
import { CssBaseline } from "@mui/material";

export const metadata = {
  title: "Shift",
  description: "Shift_Enter App",
};
//TODO: pass initials into header

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
        backgroundColor:"#FCF8F4"
      }}
    >
      <CssBaseline />
      <Header title={"Dashboard"}  initials={"JS"} />

      {children}

      <Footer />
    </Box>
  );
}
