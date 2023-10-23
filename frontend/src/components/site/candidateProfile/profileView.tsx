"use client";

import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
// query imports
import { useQuery, useQueryClient, hashQueryKey } from "@tanstack/react-query";
import { getCandidateDetails } from "@/lib/getCandidateDetails";

// my imports
import { CandidateDetailsInterface } from "./candidateInterface";
import { missingDetails } from "./missingDetails";
import {
  shadow,
  HtmlTooltip,
  proceedButtons,
  GetInitials,
} from "./candidateHelpers";
import {
  FullName,
  Pronoun,
  PhoneNumber,
  Email,
  Linkedin,
  WebsiteUrl,
  Education,
} from "./hiddenFields";
import { Location, WorkPermit, StartOn } from "./visibleFields";

// MUI imports
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import DownloadIcon from "@mui/icons-material/Download";
import ButtonGroup from "@mui/material/ButtonGroup";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarsIcon from "@mui/icons-material/Stars";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";

// TODO: getUser data based on user id
const userId = 1;
//TODO: get percent from job match
const matchPercent = 90;

export default function ProfilePreview() {
  const obj: CandidateDetailsInterface = {};
  const [candidateDetails, setCandidateDetails] = useState(obj);
  const [viewHidden, setViewHidden] = useState(false);
  const [openFeedbackRequest, setOpenFeedbackRequest] = useState(false);

  function handelShowHidden() {
    setViewHidden((prevState) => !prevState);
    setOpenFeedbackRequest(true);
    // TODO: send to api viewed information
  }

  function handleContactCandidate(){
    // open contact modal
  }

  // -- CHIPS -- //

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

  const languagesChips = missingDetails.languages.map((i) => (
    <Chip
      sx={{
        mr: 2,
        mb: 2,
        borderRadius: "10px",
        backgroundColor: "#F6F7FB",
        boxShadow: shadow,
      }}
      key={i.name}
      label={i.name + ":" + i.level}
    />
  ));

  const skillsChips = missingDetails.skills.map((i) => (
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
    />
  ));

  const initiativeChips = missingDetails.initiative_badges.map((i) => (
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
  ));

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const queryCandidate = useQuery({
    queryKey: ["candidateDetails", userId],
    queryFn:()=> getCandidateDetails(userId),
    staleTime:Infinity,
  });

  useEffect(() => {
    if (queryCandidate.status === "success") {
      setCandidateDetails(queryCandidate.data);
    }
  }, [queryCandidate.status, queryCandidate.data]);


  if (queryCandidate.isLoading) {
    return (
      <Container sx={{ mt: 3 }}>
        <Typography variant="h5" component="h1">
          Profile Preview
        </Typography>

        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ bgcolor: "white", width: "100%", marginTop: "20px" }}
          height={20}
        />
      </Container>
    );
  }
  if (queryCandidate.isError) {
    return <pre>{JSON.stringify(queryCandidate.error)}</pre>;
  }

  return (
    <Paper sx={{ px: 3, py: 3, borderRadius: "16px", mb: 3 }} elevation={0}>
      <Grid container sx={{ mb: 2 }}>
        <Grid item md={4}>
          <Typography sx={{ display: "inline-block" }}>
            Candidate profile
          </Typography>
        </Grid>
        <Grid item md={4} sx={{ textAlign: "right" }}>
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
              Would you like to rate your experience selecting candidates with
              blurred data?
            </Alert>
          </Collapse>
        </Grid>
        <Grid item md={4} sx={{ textAlign: "right" }}>
          <HtmlTooltip
            title={
              <>
                <Typography color="inherit">
                  <strong>Why you can’t see it all?</strong>
                </Typography>
                <Typography color="inherit">
                  Personal information such as name or contact details can lead
                  to a bias towards the origin of the person. This information
                  is not relevant to assessing skills and work experience. We
                  encourage you to participate in the process. However, if you
                  would like to know more, you can click the button. This action
                  will be shared with the platform.
                </Typography>
              </>
            }
          >
            <Button
              variant="outlined"
              onClick={handelShowHidden}
              sx={{
                textTransform: "none",
                marginBottom: { xs: "10px", md: "0" },
              }}
            >
              Show all
            </Button>
          </HtmlTooltip>
          <Button
            variant="contained"
            sx={{ textTransform: "none", marginLeft: "20px" }}
          >
            Contact candidate
          </Button>
        </Grid>
      </Grid>
      <Grid container sx={{ pb: 4, borderBottom: "2px solid lightGrey" }}>
        {/* end header */}
        {/* Basic info & contact */}
        <Grid item xs={12} sm={12} md={2}>
          <Avatar
            sx={{
              bgcolor: "#63E5C5",
              width: "142px",
              height: "142px",
              fontSize: "60px",
              color: "#14366F",
            }}
            // alt="Candidate image"
            // src={`${missingDetails.candidate_img}`}
          >
            <GetInitials
              first_name={candidateDetails.first_name}
              last_name={candidateDetails.last_name}
              preferred_name={candidateDetails.preferred_name}
            />
          </Avatar>
        </Grid>
        <Grid item md={10} sm={12}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 4, display: "inline-block" }}
          >
            {candidateDetails.preferred_name || ""}{" "}
          </Typography>
          <Chip
            label={`${matchPercent}% match`}
            color="success"
            sx={{ mx: 2, fontWeight: "bold", borderRadius: "10px" }}
          />
          <FavoriteBorderIcon />

          <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
            <FullName
              first_name={candidateDetails.first_name}
              last_name={candidateDetails.last_name}
              viewHidden={viewHidden}
            />
            <Pronoun pronoun={missingDetails.pronoun} viewHidden={viewHidden} />
            <Typography>{missingDetails.current_position}</Typography>
          </Stack>

          <Grid container spacing={2} sx={{ maxWidth: 600 }}>
            <PhoneNumber
              viewHidden={viewHidden}
              phone_number_region={candidateDetails.phone_number_region}
              phone_number={candidateDetails.phone_number}
            />
            <Email
              viewHidden={viewHidden}
              email_adress={candidateDetails.email_adress}
            />
            <Linkedin
              viewHidden={viewHidden}
              linkedin={missingDetails.linkedin}
            />
            <WebsiteUrl
              viewHidden={viewHidden}
              website={missingDetails.website}
            />
            <Location
              city={candidateDetails.city}
              country={candidateDetails.country}
            />
            <WorkPermit work_permit={candidateDetails.work_permit} />
            <StartOn start_date={missingDetails.start_date} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm={12} md={3}>
          <Box sx={{ py: 3, px: 1 }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              SKILLS
            </Typography>
            <Box sx={{ mb: 1 }}>{skillsChips}</Box>
          </Box>
          <Box sx={{ py: 0, px: 1 }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              CV
            </Typography>
            <Button
              component="label"
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{ textTransform: "none" }}
            >
              View CV
            </Button>
          </Box>
          <Box sx={{ py: 3, px: 1 }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              OTHER DOCUMENTS
            </Typography>
            <Button
              component="label"
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{ textTransform: "none" }}
            >
              View documents
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
          <Box sx={{ py: 0, px: 1 }}>
            <Typography variant="body1" sx={{ pb: 1 }}>
              <strong>Initiative badge</strong>
            </Typography>
            {initiativeChips}
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
            <Typography>{candidateDetails.related_experience}</Typography>
          </Box>
          <Box sx={{ py: 3, px: 1, borderBottom: "2px solid lightGrey" }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              EDUCATION
            </Typography>
            {/* <Typography>{candidateDetails.related_experience}</Typography> */}

            <Education
              viewHidden={viewHidden}
              education={missingDetails.education}
            />
          </Box>
          <Box sx={{ py: 3, px: 1, borderBottom: "2px solid lightGrey" }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              STRENGTHS
            </Typography>
            <Box sx={{ mb: 1 }}>{strengthsChips}</Box>
          </Box>
          <Box sx={{ py: 3, px: 1 }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              LANGUAGES
            </Typography>
            <Box sx={{ mb: 1 }}>{languagesChips}</Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container sx={{ borderTop: "2px solid lightGrey" }}>
        <Grid item md={6} sx={{ pt: 2 }}>
          {/* <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            //onClick={() => setViewHidden((prevState) => !prevState)}
          >
            Add Notes
          </Button> */}
        </Grid>
        <Grid item md={6} sx={{ pt: 2, textAlign: "right" }}>
          <ButtonGroup size="small" aria-label="small button group">
            {proceedButtons}
          </ButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
}
