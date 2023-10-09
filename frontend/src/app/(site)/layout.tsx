import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Header from "@/components/site/header";
import Footer from "@/components/site/footer";
import { CssBaseline } from "@mui/material";

export const metadata = {
  title: "Shift",
  description: "Shift_Enter App",
};

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
      <Header title={"Dashboard"} />

      {children}

      <Footer />
    </Box>
  );
}
