import * as React from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { CssBaseline } from "@mui/material"

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry"
import AuthLeft from "./authLeft"

export const metadata = {
  title: "Shift Authentication",
  description: "Shift_Enter App - Authentication",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Box>
            <Grid container component="main" sx={{ height: "100vh" }}>
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage:
                    "url(https://source.unsplash.com/random?wallpapers)",
                  backgroundRepeat: "no-repeat",
                    // backgroundColor: (t) =>
                    //   t.palette.mode === "light"
                    //     ? t.palette.grey[50]
                    //     : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <AuthLeft />
              </Grid>


              {children}

            </Grid>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  )
}
