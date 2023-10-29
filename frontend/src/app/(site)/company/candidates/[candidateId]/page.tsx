"use client";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { SignInProviderContext } from "@/components/providers/SignInProvider";

import ProfilePreview from "@/components/site/candidateProfile/profileView";
import Notes from "@/components/site/companyNotes/Notes";

type Params = {
  params: {
    candidateId: string;
  };
};

//TODO: move api call or pass userId down to component

export default function UserProfilePage({ params: { candidateId } }: Params) {
  const signInContext = useContext(SignInProviderContext);
  const companyId = signInContext.auth?.user?.id || 1;
  

  return (
    <>
      <Grid container sx={{ mb: 4, mt:0 }}>
        <Grid item md={6}>
          {" "}
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
        <Grid item md={6} sx={{ textAlign: "right" }}></Grid>
      </Grid>

      <ProfilePreview candidateId={+candidateId} matchPercent={90} />
      <Notes company_id={+companyId} candidate_id={+candidateId} />
    </>
  );
}
