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

const bgImg = "/images/site-background-1.png ";
const bgImg2 = "/images/site-background-2.png ";

console.log("image here", bgImg);

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
        backgroundImage: `url(${bgImg}), url(${bgImg2})`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "228px 1240px",
        backgroundPosition: "left 160px, right 65px",
        backgroundColor: "#FCF8F4",
      }}
    >
      <CssBaseline />
      <Header title={"Dashboard"} initials={"JS"} />

      {children}

      <Footer />
    </Box>
  );
}
