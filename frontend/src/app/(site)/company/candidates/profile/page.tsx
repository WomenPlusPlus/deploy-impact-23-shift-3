"use client";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";

import ProfilePreview from "@/components/site/candidateProfile/profileView";

export default function PreviewPage() {
  return (
    <>
      <Grid container sx={{ mb: 4 }}>
        <Grid item md={6}></Grid>
        <Grid item md={6} sx={{ textAlign: "right" }}>
          <Link href="/company/candidates/">
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              sx={{ textTransform: "none" }}
            >
              Go back
            </Button>
          </Link>
        </Grid>
      </Grid>

      <ProfilePreview />
    </>
  );
}
