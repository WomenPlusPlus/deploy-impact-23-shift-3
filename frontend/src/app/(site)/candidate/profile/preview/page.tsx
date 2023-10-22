"use client";
import Link from "next/link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import ProfilePreview from "@/components/site/candidateProfile/profileView";

export default function PreviewPage() {
  return (
    <>
      <Grid container sx={{ mb: 4 }}>
        <Grid item md={6}>
          <Typography variant="h5" component="h1">
            Preview of your candidate profile
          </Typography>
          <Typography variant="body1" component="p">
            This is how the recruiters will see your application information.
          </Typography>
        </Grid>
        <Grid item md={6} sx={{ textAlign: "right" }}>
          <Link href="/candidate/profile">
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              // onClick={handleOpen}
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
