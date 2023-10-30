"use client";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
// query imports
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCandidateDetails } from "@/lib/getCandidateDetails";

// my imports
import { CandidateDetailsInterface } from "./candidateInterface";
import { missingDetails } from "./missingDetails";
import {
  HtmlTooltip,
  proceedButtons,
  ProfileAvatar,
  shadow,
} from "./candidateHelpers";
import {
  Education,
  Email,
  FullName,
  Linkedin,
  PhoneNumber,
  Pronoun,
  WebsiteUrl,
} from "./hiddenFields";
import { Location, StartOn, WorkPermit } from "./visibleFields";
import ContactForm from "../candidateContactForm/contactForm";
import ViewCv from "./viewCv";
import { SkillsChips } from "./chips";

// MUI imports
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import ButtonGroup from "@mui/material/ButtonGroup";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarsIcon from "@mui/icons-material/Stars";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";

import { usePathname } from "next/navigation";

//TODO: get percent from job match
const matchPercent = 90;
interface ContactFormsProps {
  candidateId: number;
  matchPercent: number;
}

interface ViewCvProps {
  candidateId: number;
}

export default function ProfilePreview({ candidateId = 0, matchPercent = 90 }) {
  const obj: CandidateDetailsInterface = {};
  const [candidateDetails, setCandidateDetails] = useState(obj);
  const [viewHidden, setViewHidden] = useState(false);
  const [openFeedbackRequest, setOpenFeedbackRequest] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  //contact form
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    setOpen(false);
    setSnackOpen(true);
  };

  // view cv
  const [openCv, setOpenCv] = useState(false);
  const handleOpenCv = () => setOpenCv(true);
  const handleCloseCv = () => setOpenCv(false);

  const signInContext = useContext(SignInProviderContext);
  const userId = signInContext.auth?.user?.id || 1;

  // if viewed by company need to get candidateId
  let candidate_id = -1;
  if (candidateId > 0) {
    candidate_id = candidateId;
  } else {
    candidate_id = +userId;
  }

  //snack
  const handleCloseSnack = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  // check if candidate or company view
  const pathName = usePathname();
  const pathNameStart = pathName.split("/")[1];

  function handelShowHidden() {
    setViewHidden((prevState) => !prevState);
    setOpenFeedbackRequest(true);
    // TODO: send to api viewed information
  }

  function handleContactCandidate() {
    // open contact modal
    setOpen(true);
  }

  function handleViewCv() {
    // open view cv  modal
    setOpenCv(true);
  }

  // -- CHIPS -- TODO: move all chips to chips component //

  const strengthsChips = missingDetails.strengths.map((i) => (
    <Chip
      sx={{
        mr: 2,
        mb: 2,
        borderRadius: "10px",
        backgroundColor: "#F6F7FB",
        boxShadow: shadow,
      }}
      key={i}
      label={i}
    />
  ));

  // const languagesChips = candidateDetails.languages ?
  //  candidateDetails.languages.map((i) => (
  //   <Chip
  //     sx={{
  //       mr: 2,
  //       mb: 2,
  //       borderRadius: "10px",
  //       backgroundColor: "#F6F7FB",
  //       boxShadow: shadow,
  //     }}
  //     key={i.name}
  //     label={i.name + ":" + i.proficieny}
  //   />
  // )):"-";

  const languagesChips = candidateDetails.languages
    ? candidateDetails.languages.map((i) => (
        <Typography
          sx={{
            mb: 1,
          }}
          key={i.name}
        >
          <strong>{i.name}</strong> : {i.proficieny}
        </Typography>
      ))
    : "-";

  const initiativeChips = candidateDetails.Initiatives
    ? candidateDetails.Initiatives.map((i) => (
        <Chip
          sx={{
            mr: 1,
            mb: 2,
            borderRadius: "10px",
            backgroundColor: "#F6F7FB",
            boxShadow: shadow,
          }}
          key={i}
          label={i}
          icon={<StarsIcon color="primary" fontSize="small" />}
        />
      ))
    : "-";

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const queryCandidate = useQuery({
    queryKey: ["candidateDetails", candidate_id],
    queryFn: () => getCandidateDetails(candidate_id),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (pathNameStart === "candidate") {
      setIsCandidate(true);
      setViewHidden(true);
    }
    if (queryCandidate.status === "success") {
      setCandidateDetails(queryCandidate.data);
    }
  }, [queryCandidate.status, queryCandidate.data, pathNameStart]);

  if (queryCandidate.isLoading) {
    return (
      <Container sx={{ my: 2, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }
  if (queryCandidate.isError) {
    return <pre>{JSON.stringify(queryCandidate.error)}</pre>;
  }

  return (
    <Paper sx={{ px: 3, py: 3, borderRadius: "16px", mb: 3 }} elevation={0}>
      <ViewCv
        openCv={openCv}
        handleOpen={handleOpenCv}
        handleClose={handleCloseCv}
        candidateId={candidateId}
      />
      {!isCandidate ? (
        <>
          <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnack}
          >
            <Alert
              onClose={handleCloseSnack}
              severity="success"
              sx={{ width: "100%" }}
            >
              The message has been successfully sent!
            </Alert>
          </Snackbar>
          <ContactForm
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleSend={handleSend}
          />

          <Grid container sx={{ mb: 2 }}>
            <Grid item lg={6} md={5} sm={4}>
              <Typography sx={{ display: "inline-block" }}>
                Candidate profile
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={4} sx={{ textAlign: "right" }}>
              <Collapse in={openFeedbackRequest}>
                <Alert
                  icon={false}
                  severity="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenFeedbackRequest(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{
                    maxWidth: "500px",
                    minWidth: "200px",
                    backgroundColor: "#ECF0F6",
                  }}
                >
                  Would you like to rate your experience selecting candidates
                  with blurred data?
                </Alert>
              </Collapse>
            </Grid>
            <Grid item lg={3} md={4} sm={4} sx={{ textAlign: "right" }}>
              {!viewHidden ? (
                <HtmlTooltip
                  title={
                    <>
                      <Typography color="inherit">
                        <strong>Why you can’t see it all?</strong>
                      </Typography>
                      <Typography color="inherit">
                        Personal information such as name or contact details can
                        lead to a bias towards the origin of the person. This
                        information is not relevant to assessing skills and work
                        experience. We encourage you to participate in the
                        process. However, if you would like to know more, you
                        can click the button. This action will be shared with
                        the platform.
                      </Typography>
                    </>
                  }
                >
                  <Button
                    variant="outlined"
                    onClick={handelShowHidden}
                    disabled={viewHidden}
                    sx={{
                      textTransform: "none",
                      marginBottom: { xs: "10px", md: "0" },
                    }}
                  >
                    Show all
                  </Button>
                </HtmlTooltip>
              ) : (
                <Button
                  variant="outlined"
                  onClick={handelShowHidden}
                  disabled={viewHidden}
                  sx={{
                    textTransform: "none",
                    marginBottom: { xs: "10px", md: "0" },
                  }}
                >
                  Show all
                </Button>
              )}

              <Button
                onClick={handleContactCandidate}
                variant="contained"
                sx={{ textTransform: "none", marginLeft: "20px" }}
              >
                Contact candidate
              </Button>
            </Grid>
          </Grid>
        </>
      ) : null}

      <Grid container sx={{ pb: 4, borderBottom: "2px solid lightGrey" }}>
        {/* end header */}
        {/* Basic info & contact */}
        <Grid item xs={12} sm={12} md={2}>
          <ProfileAvatar
            first_name={candidateDetails.first_name}
            last_name={candidateDetails.last_name}
            preferred_name={candidateDetails.preferred_name}
          />
        </Grid>
        <Grid item md={10} sm={12}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 4, display: "inline-block" }}
          >
            {candidateDetails.preferred_name || ""}
          </Typography>
          {!isCandidate ? (
            <>
              <Chip
                label={`${matchPercent}% match`}
                color="success"
                sx={{ ml: 2, mr: 0, fontWeight: "bold", borderRadius: "10px" }}
              />
              <Chip
                label="New candidate"
                sx={{
                  mx: 2,
                  fontWeight: "bold",
                  borderRadius: "10px",
                  backgroundColor: "#D96C06",
                }}
              />
              <FavoriteBorderIcon />
            </>
          ) : null}

          <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
            <FullName
              first_name={candidateDetails.first_name}
              last_name={candidateDetails.last_name}
              viewHidden={viewHidden}
            />
            <Pronoun
              pronoun={candidateDetails.gender}
              viewHidden={viewHidden}
            />
            <Typography>{candidateDetails.wanted_job_title}</Typography>
          </Stack>

          <Grid container spacing={2} sx={{ maxWidth: 600 }}>
            <PhoneNumber
              viewHidden={viewHidden}
              phone_number_region={missingDetails.phone_number_region}
              phone_number={candidateDetails.phone_number}
            />
            <Email viewHidden={viewHidden} email={candidateDetails.email} />
            <Linkedin
              viewHidden={viewHidden}
              linkedin={candidateDetails.linkedin}
            />
            <WebsiteUrl
              viewHidden={viewHidden}
              website={missingDetails.website}
            />
            <Location
              city={candidateDetails.location_city}
              country={missingDetails.country}
            />
            <WorkPermit
              work_permit={candidateDetails.work_permission_CH ? "yes" : "no"}
            />
            <StartOn start_date={candidateDetails.notice_period_months} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm={12} md={3}>
          <Box sx={{ py: 3, px: 1 }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              INITIATIVE CERTIFICATE
            </Typography>
            {initiativeChips}
          </Box>
          <Box sx={{ py: 0, px: 1, pb: 1 }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              HARD SKILLS
            </Typography>
            <Box sx={{ mb: 1 }}>
              <SkillsChips skills={candidateDetails.hard_skills} />
            </Box>
          </Box>
          <Box sx={{ py: 0, px: 1 }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              SOFT SKILLS
            </Typography>
            <Box sx={{ mb: 1 }}>
              <SkillsChips skills={candidateDetails.soft_skills} />
            </Box>
          </Box>
          <Box sx={{ py: 0, px: 1 }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              CV
            </Typography>
            <Button
              component="label"
              variant="outlined"
              sx={{ textTransform: "none" }}
              onClick={handleViewCv}
            >
              Preview CV
            </Button>
          </Box>
          <Box sx={{ py: 3, px: 1 }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              OTHER DOCUMENTS
            </Typography>
            <Button
              component="label"
              variant="outlined"
              sx={{ textTransform: "none" }}
            >
              Preview documents
            </Button>
          </Box>
          <Box sx={{ py: 3, px: 1 }}>
            <Typography variant="body1" sx={{ pb: 1 }}>
              <strong>Invited by</strong>
            </Typography>
            <Typography variant="body1" sx={{ pb: 1 }}>
              {missingDetails.invited_by}
            </Typography>
          </Box>
        </Grid>

        {/* Main body */}
        <Grid item sm={12} md={9}>
          <Box sx={{ py: 3, px: 1, borderBottom: "2px solid lightGrey" }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              ABOUT ME
            </Typography>
            <Typography>{candidateDetails.about_me}</Typography>
          </Box>
          <Box sx={{ py: 3, px: 1, borderBottom: "2px solid lightGrey" }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              EXPERIENCE
            </Typography>
            <Typography>{candidateDetails.experience}</Typography>
          </Box>
          <Box sx={{ py: 3, px: 1, borderBottom: "2px solid lightGrey" }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              EDUCATION
            </Typography>
            {/* <Typography>{candidateDetails.related_experience}</Typography> */}

            {/* <Education
              viewHidden={viewHidden}
              education={missingDetails.education}
            /> */}
            <Education
              education={candidateDetails.education || ""}
              viewHidden={viewHidden}
            />
          </Box>
          {/* <Box sx={{ py: 3, px: 1, borderBottom: "2px solid lightGrey" }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              STRENGTHS
            </Typography>
            <Box sx={{ mb: 1 }}>{strengthsChips}</Box>
          </Box> */}
          <Box sx={{ py: 3, px: 1 }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              LANGUAGES
            </Typography>
            <Box sx={{ mb: 1 }}>{languagesChips}</Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container sx={{ borderTop: "2px solid lightGrey" }}>
        {!isCandidate ? (
          <Grid item md={12} sx={{ pt: 2, textAlign: "right" }}>
            <ButtonGroup size="small" aria-label="small button group">
              {proceedButtons}
            </ButtonGroup>
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  );
}
