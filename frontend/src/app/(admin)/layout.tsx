import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CssBaseline } from "@mui/material";


//for query

export const metadata = {
  title: "Shift Admin",
  description: "Shift_Enter App - Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {children}
      </Grid>
    </Box>
  );
}
