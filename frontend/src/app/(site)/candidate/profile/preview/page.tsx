"use client";
import Link from "next/link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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
    
              variant="outlined"
              // onClick={handleOpen}
              sx={{ textTransform: "none", mr:2 }}
            >
              Edit profile
            </Button>
          </Link>
          <Link href="/candidate/jobs">
            <Button
    
              variant="contained"
              // onClick={handleOpen}
              sx={{ textTransform: "none" }}
            >
              Find jobs
            </Button>
          </Link>
        </Grid>
      </Grid>


        <ProfilePreview />
     
    </>
  );
}
