"use client";

import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
// query
import { useQuery, useQueryClient, hashQueryKey } from "@tanstack/react-query";
import Link from "next/link";

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
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from '@mui/icons-material/Close';

// TODO: getUser data based on user id
const userId = 1;

interface Details {
  first_name?: string;
  last_name?: string;
  preferred_name?: string;
  values_text?: string;
  related_experience?: string;
  desired_job?: string;
  personality_description?: string;
  street_address?: string;
  house_number?: string;
  postal_code?: number;
  city?: string;
  phone_number_region?: number;
  phone_number?: number;
  email_adress?: string;
  birth_date?: number;
  notice_period_months?: number;
  file_cv?: string;
  preferred_work_id?: number;
  accepted_privacy?: boolean;
  skip_tutorial?: boolean;
  preferred_work_model?: string;
  country?: string;
  work_permit?: string;
  status?: string;
  invited_by?: string;
}

import { getCandidateDetails } from "@/lib/getCandidateDetails";

// interface ProfilePreviewProps {
//     closeHandler:string  
//   }
  

export default function ProfilePreview() {
    // const { closeHandler } = props;

  const obj: Details = {};
  const [state, setState] = useState(obj);
  const [viewHidden, setViewHidden] = useState(false);

  // Missing fields from api call
  const missing = {
    current_position: "Frontend Developer",
    candidate_img: "",
    linkedin: "https://ch.linkedin.com/company/womenplusplus",
    website: "",
    about_me:
      "Lorem ipsum dolor sit amet consectetur. Nulla auctor commodo etiam tellus sit est habitasse semper hendrerit. Leo lectus accumsan pulvinar purus ultricies tempor et donec posuere. In molestie aliquet vel consectetur dolor placerat turpis arcu risus. Viverra nibh integer vitae ut eget semper enim rutrum a.",
    strengths: [
      "Adaptability",
      "Collaboration",
      "Detail Oriented",
      "Honesty",
      "Innovation",
      "Learning",
      "Teamwork",
    ],
    languages: [
      { name: "English", level: "Proficient" },
      { name: "German", level: "Fluent" },
      { name: "French", level: "Conversational" },
    ],
    skills: ["HTML", "JavaScript", "React"],
    initiative_badges: ["name 1", "name 2"],
    invited_by: "Women++",
  };

  const blurSize = "4px";

  // Hidden elements -- //
  function FullName() {
    //make radom letters same length as name
    const n1 = state.first_name?.length || 0;
    const n2 = state.last_name?.length || 0;

    const randomLetters = (n: number | 0) => {
      const letters = "abcdefghijklmnopqurstuvwxyz";
      const randomLetter = () =>
        letters[Math.floor(Math.random() * letters.length)];
      let word = "";
      for (let i = 0; i < n; i++) {
        word += randomLetter();
      }
      return word;
    };

    return viewHidden ? (
      <Typography>
        <strong>{`${state.first_name} ${state.last_name}`}</strong>{" "}
      </Typography>
    ) : (
      <Typography sx={{ filter: `blur(${blurSize})` }}>
        <strong>{`${randomLetters(n1)} ${randomLetters(n2)}`}</strong>
      </Typography>
    );
  }

  function PhoneNumber() {
    return viewHidden ? (
      <Typography>{`${state.phone_number_region} ${state.phone_number}`}</Typography>
    ) : (
      <Typography
        sx={{ filter: `blur(${blurSize})` }}
      >{`123 123456`}</Typography>
    );
  }

  function Email() {
    return viewHidden ? (
      <Typography>{`${state.email_adress}`}</Typography>
    ) : (
      <Typography
        sx={{ filter: `blur(${blurSize})` }}
      >{`email@address.com`}</Typography>
    );
  }

  function Linkedin() {
    // TODO: not returned
    //check if exists
    if (!missing.linkedin) return;

    return viewHidden ? (
      <Link href={missing.linkedin} target="_blank">
        LinkedIn
      </Link>
    ) : (
      <Typography sx={{ filter: `blur(${blurSize})` }}>{`LinkedIn`}</Typography>
    );
  }

  function WebsiteUrl() {
    // TODO: not returned
    //check if exists
    if (!missing.website) return;

    return viewHidden ? (
      <Link href={missing.website} target="_blank">
        URL Website
      </Link>
    ) : (
      <Typography
        sx={{ filter: `blur(${blurSize})` }}
      >{`URL Website`}</Typography>
    );
  }
  // End Hidden elements -- //
  function Location() {
    return viewHidden ? (
      <Typography>{`${state.city}, ${state.country}`}</Typography>
    ) : (
      <Typography
        sx={{ filter: `blur(${blurSize})` }}
      >{`city, country`}</Typography>
    );
  }

  // -- CHIPS -- //
  const strengthsChips = missing.strengths.map((i) => (
    <Chip sx={{ mr: 2, mb: 2 }} key={i} label={i} />
  ));

  const languagesChips = missing.languages.map((i) => (
    <Chip sx={{ mr: 2, mb: 2 }} key={i.name} label={i.name + ":" + i.level} />
  ));

  const skillsChips = missing.skills.map((i) => (
    <Chip sx={{ mr: 1, mb: 2 }} key={i} label={i} />
  ));

  const initiativeChips = missing.initiative_badges.map((i) => (
    <Chip sx={{ mr: 1, mb: 2 }} key={i} label={i} />
  ));


  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const queryCandidate = useQuery({
    queryKey: ["candidateDetails"],
    queryFn: getCandidateDetails,
  });

  // to setState
  useEffect(() => {
    if (queryCandidate.status === "success") {
      setState(queryCandidate.data);
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
    <Container sx={{ mb: 8 }}>
      <Paper sx={{ px: 3, py: 3, borderRadius: "16px", mb: 3 }} elevation={3}>
        {/* header and close (i'm not sure why we are doing it as a overlay screen) */}
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={6}>
            Candidate profile
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
          {/* <IconButton aria-label="close" onClick={closeHandler}> */}
          <CloseIcon />
{/* </IconButton> */}
          
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
              // src={`${missing.candidate_img}`}
            >
              JS
            </Avatar>
          </Grid>
          <Grid item md={10} sm={12}>
            <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
              {state.preferred_name || ""}{" "}
              <Chip label="90% match" color="success" sx={{ ml: 2 }} />
            </Typography>

            <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
              <FullName />
              <Typography>{missing.current_position}</Typography>
            </Stack>

            <Stack component="div" direction="row" spacing={3}>
              <PhoneNumber /> <Email /> <Linkedin /> <WebsiteUrl /> <Location />
            </Stack>
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
              >
                Download CV
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
              >
                Download zip
              </Button>
            </Box>
            <Box sx={{ py: 3, px: 1 }}>
              <Typography variant="body1" sx={{ pb: 1 }}>
                <strong>Invited by</strong>
              </Typography>
              <Typography variant="body1" sx={{ pb: 1 }}>
                {missing.invited_by}
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
              <Typography>{missing.about_me}</Typography>
            </Box>
            <Box sx={{ py: 3, px: 1, borderBottom: "2px solid lightGrey" }}>
              <Typography variant="h6" sx={{ pb: 1 }}>
                EXPERIENCE
              </Typography>
              <Typography>{state.related_experience}</Typography>
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
            <Button
              variant="outlined"
              //onClick={() => setViewHidden((prevState) => !prevState)}
            >
              Add Notes
            </Button>
          </Grid>
          <Grid item md={6} sx={{ pt: 2, textAlign: "right" }}>
            <Button
              variant="outlined"
              onClick={() => setViewHidden((prevState) => !prevState)}
            >
              Show all
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
