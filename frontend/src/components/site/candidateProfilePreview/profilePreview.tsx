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
import Alert from "@mui/material/Alert";
import DownloadIcon from "@mui/icons-material/Download";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

//new icons
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import WorkIcon from "@mui/icons-material/Work";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarsIcon from "@mui/icons-material/Stars";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";

const shadow =
  "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#F2F5FA",
    color: "#45494F",
    maxWidth: 312,
    borderRadius: "10px",
    boxShadow: shadow,
    padding: "10px",
  },
}));

// TODO: getUser data based on user id
const userId = 1;

//TODO: get percent from job match
const matchPercent = 90;

interface Details {
  first_name?: string | "";
  last_name?: string | "";
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
  about_me?: string;
}

import { getCandidateDetails } from "@/lib/getCandidateDetails";

// interface ProfilePreviewProps {
//     closeHandler:string
//   }

const buttons = [
  <Button
    key="one"
    sx={{ textTransform: "none" }}
    startIcon={<PersonRemoveAlt1Icon />}
  >
    Don't proceed
  </Button>,
  <Button
    key="two"
    sx={{ textTransform: "none" }}
    startIcon={<PersonAddAlt1Icon />}
  >
    Assign job
  </Button>,
];

export default function ProfilePreview() {
  const obj: Details = {};
  const [state, setState] = useState(obj);
  const [viewHidden, setViewHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Missing fields from api call
  const missing = {
    pronoun: "She/Her",
    current_position: "Frontend Developer",
    candidate_img: "",
    linkedin: "https://ch.linkedin.com/company/womenplusplus",
    website: "test",
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
    start_date: "06/11/2023",
    education: [
      {
        institution: "University of bla",
        subject: "Watercolor painting",
        date: "01/03/2010",
        location: "Germany",
      },
      {
        institution: "University of Zurich",
        subject: "Scuba Diving",
        date: "01/03/2015",
        location: "Zurich",
      },
    ],
  };

  const blurSize = "4px";

  function handelShow() {
    setViewHidden((prevState) => !prevState);
    setOpen(true);
  }

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

  function Pronoun() {
    return viewHidden ? (
      <Typography>{`(${missing.pronoun})`}</Typography>
    ) : (
      <Typography sx={{ filter: `blur(${blurSize})` }}>
        "(pron/pron)"
      </Typography>
    );
  }

  function PhoneNumber() {
    return viewHidden ? (
      <Grid item>
        <PhoneIphoneIcon
          color="primary"
          fontSize="small"
          sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
        />
        <Typography
          sx={{ display: "inline-block" }}
        >{`${state.phone_number_region} ${state.phone_number}`}</Typography>
      </Grid>
    ) : (
      <Grid item>
        <PhoneIphoneIcon
          color="primary"
          fontSize="small"
          sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
        />
        <Typography
          sx={{ filter: `blur(${blurSize})`, display: "inline-block" }}
        >{`123 123456`}</Typography>
      </Grid>
    );
  }

  function Email() {
    return viewHidden ? (
      <Grid item>
        <AlternateEmailIcon
          color="primary"
          fontSize="small"
          sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
        />
        <Typography
          sx={{ display: "inline-block" }}
        >{`${state.email_adress}`}</Typography>
      </Grid>
    ) : (
      <Grid item>
        <AlternateEmailIcon
          color="primary"
          fontSize="small"
          sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
        />
        <Typography
          sx={{ filter: `blur(${blurSize})`, display: "inline-block" }}
        >{`email@address.com`}</Typography>
      </Grid>
    );
  }

  function Linkedin() {
    // TODO: not returned
    //check if exists
    if (!missing.linkedin) return;

    return viewHidden ? (
      <Grid item>
        <LinkedInIcon
          color="primary"
          fontSize="small"
          sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
        />
        <Link href={missing.linkedin} target="_blank">
          LinkedIn
        </Link>
      </Grid>
    ) : (
      <Grid item>
        <LinkedInIcon
          color="primary"
          fontSize="small"
          sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
        />
        <Typography
          sx={{ filter: `blur(${blurSize})`, display: "inline-block" }}
        >{`LinkedIn`}</Typography>
      </Grid>
    );
  }

  function WebsiteUrl() {
    // TODO: not returned
    //check if exists
    if (!missing.website) return;

    return viewHidden ? (
      <Grid item>
        <LinkIcon
          color="primary"
          fontSize="small"
          sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
        />
        <Link href={missing.website} target="_blank">
          URL Website
        </Link>
      </Grid>
    ) : (
      <Grid item>
        <LinkIcon
          color="primary"
          fontSize="small"
          sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
        />
        <Typography
          sx={{ filter: `blur(${blurSize})`, display: "inline-block" }}
        >{`URL Website`}</Typography>
      </Grid>
    );
  }

  function Education() {
    if (!missing.education) return;

    const list = missing.education;

    let outputShow = list.map((inst) => (
      <Grid container key={inst.institution}>
        <Grid item md={10}>
          <Typography>
            <strong>{inst.institution}</strong>
          </Typography>
          <Typography sx={{ mb: 2 }}>{inst.subject}</Typography>
        </Grid>
        <Grid item key={inst.institution} md={2}>
          <Typography>
            <strong>{inst.date}</strong>
          </Typography>
          <Typography>{inst.location}</Typography>
        </Grid>
      </Grid>
    ));

    let outputHide = list.map((inst) => (
      <Grid container key={inst.institution}>
        <Grid item md={10}>
          <Typography sx={{ filter: `blur(${blurSize})` }}>
            <strong>University of life</strong>
          </Typography>
          <Typography sx={{ mb: 2 }}>{inst.subject}</Typography>
        </Grid>
        <Grid item key={inst.institution} md={2}>
          <Typography sx={{ filter: `blur(${blurSize})` }}>
            <strong>01/02/2000</strong>
          </Typography>
          <Typography sx={{ filter: `blur(${blurSize})` }}>Moon</Typography>
        </Grid>
      </Grid>
    ));

    return !viewHidden ? outputHide : outputShow;
  }

  // End Hidden elements -- //
  function Location() {
    return (
      <Grid item>
        <HomeWorkIcon
          color="primary"
          fontSize="small"
          sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
        />
        <Typography
          sx={{ display: "inline-block" }}
        >{`${state.city}, ${state.country}`}</Typography>
      </Grid>
    );
  }

  function WorkPermit() {
    return (
      <Grid item>
        <WorkIcon
          color="primary"
          fontSize="small"
          sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
        />
        <Typography
          sx={{ display: "inline-block" }}
        >{`Work permit: ${state.work_permit}`}</Typography>
      </Grid>
    );
  }

  function StartOn() {
    return (
      <Grid item>
        <PermContactCalendarIcon
          color="primary"
          fontSize="small"
          sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
        />
        <Typography
          sx={{ display: "inline-block" }}
        >{`Ready to start on: ${missing.start_date}`}</Typography>
      </Grid>
    );
  }

  // -- CHIPS -- //

  const strengthsChips = missing.strengths.map((i) => (
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

  const languagesChips = missing.languages.map((i) => (
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

  const skillsChips = missing.skills.map((i) => (
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

  const initiativeChips = missing.initiative_badges.map((i) => (
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

  //TODO: make this a component so can be used in header
  // get initials
  function getInitials() {
    if (state.preferred_name) {
      const names = state.preferred_name.split(" ");

      if (names.length > 1) {
        let initials = "";
        names.forEach((n) => {
          initials += n[0];
        });
        if (initials.length > 2) {
          initials = initials.substring(0, 2);
        }
        return initials.toUpperCase();
      } else {
        const initials = state.preferred_name[0];
        return initials.toUpperCase();
      }
    } else if (state.first_name && state.last_name) {
      return (
        state.first_name[0].toUpperCase() + state.last_name[0].toUpperCase()
      );
    }
  }

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
    <Paper sx={{ px: 3, py: 3, borderRadius: "16px", mb: 3 }} elevation={0}>
      {/* header and close (i'm not sure why we are doing it as a overlay screen) */}
      <Grid container sx={{ mb: 2 }}>
        <Grid item md={4}>
          <Typography sx={{ display: "inline-block" }}>
            Candidate profile
          </Typography>
        </Grid>
        <Grid item md={4} sx={{ textAlign: "right" }}>
          <Collapse in={open}>
            <Alert
              icon={false}
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ maxWidth: "500px", minWidth: "200px", backgroundColor:"#ECF0F6" }}
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
              onClick={handelShow}
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
            // src={`${missing.candidate_img}`}
          >
            {getInitials()}
          </Avatar>
        </Grid>
        <Grid item md={10} sm={12}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 4, display: "inline-block" }}
          >
            {state.preferred_name || ""}{" "}
          </Typography>
          <Chip
            label={`${matchPercent}% match`}
            color="success"
            sx={{ mx: 2, fontWeight: "bold", borderRadius: "10px" }}
          />
          <FavoriteBorderIcon />

          <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
            <FullName />
            <Pronoun />
            <Typography>{missing.current_position}</Typography>
          </Stack>

          <Grid container spacing={2} sx={{ maxWidth: 600 }}>
            <PhoneNumber />
            <Email /> <Linkedin /> <WebsiteUrl /> <Location /> <WorkPermit />{" "}
            <StartOn />
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
              sx={{ textTransform: "none" }}
            >
              Download .zip
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
            <Typography>{state.about_me}</Typography>
          </Box>
          <Box sx={{ py: 3, px: 1, borderBottom: "2px solid lightGrey" }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              EXPERIENCE
            </Typography>
            <Typography>{state.related_experience}</Typography>
          </Box>
          <Box sx={{ py: 3, px: 1, borderBottom: "2px solid lightGrey" }}>
            <Typography variant="h6" sx={{ pb: 1 }}>
              EDUCATION
            </Typography>
            {/* <Typography>{state.related_experience}</Typography> */}

            <Education />
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
            {buttons}
          </ButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
}
