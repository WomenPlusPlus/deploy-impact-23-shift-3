"use client";
import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";

import Header from "@/components/site/header";
import Footer from "@/components/site/footer";
import { CssBaseline } from "@mui/material";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
import { useRouter } from "next/navigation";

const bgImg = "/images/site-background-1.png ";
const bgImg2 = "/images/site-background-2.png ";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoggedIn } = useContext(SignInProviderContext);

  if (!isLoggedIn()) {
    router.replace("/login");
    return null;
  }
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
      <Header initials={"JS"} />
      {children}
      <Footer />
    </Box>
  );
}
