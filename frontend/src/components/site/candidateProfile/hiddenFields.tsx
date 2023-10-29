import React from "react";
import Typography from "@mui/material/Typography";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Grid from "@mui/material/Grid";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";
import Link from "@mui/material/Link";
import { blurSize } from "./candidateHelpers";

interface FullNameProps {
  viewHidden: boolean;
  first_name?: string;
  last_name?: string;
}

interface PronounProps {
  viewHidden: boolean;
  pronoun?: string;
}

interface PhoneNumberProps {
  viewHidden: boolean;
  phone_number_region?: number;
  phone_number?: number;
}

interface EmailProps {
  viewHidden: boolean;
 email?: string;
}

interface LinkedinProps {
  viewHidden: boolean;
  linkedin?: string;
}

interface WebsiteUrlProps {
  viewHidden: boolean;
  website?: string;
}

interface EducationProps {
  viewHidden: boolean;
  education?: {
    institution: string;
    subject: string;
    date: string;
    location: string;
  }[];
}

export const FullName: React.FC<FullNameProps> = ({
  first_name,
  last_name,
  viewHidden,
}) => {
  //make radom letters same length as name
  const n1 = first_name?.length || 0;
  const n2 = last_name?.length || 0;

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
      <strong>{`${first_name} ${last_name}`}</strong>{" "}
    </Typography>
  ) : (
    <Typography sx={{ filter: `blur(${blurSize})` }}>
      <strong>{`${randomLetters(n1)} ${randomLetters(n2)}`}</strong>
    </Typography>
  );
};

export const Pronoun: React.FC<PronounProps> = ({ pronoun, viewHidden }) => {
  return viewHidden ? (
    <Typography>{`(${pronoun})`}</Typography>
  ) : (
    <Typography sx={{ filter: `blur(${blurSize})` }}>"(pron/pron)"</Typography>
  );
};

export const PhoneNumber: React.FC<PhoneNumberProps> = ({
  viewHidden,
  phone_number_region,
  phone_number,
}) => {
  return viewHidden ? (
    <Grid item>
      <PhoneIphoneIcon
        color="primary"
        fontSize="small"
        sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
      />
      <Typography
        sx={{ display: "inline-block" }}
      >{`${phone_number_region} ${phone_number}`}</Typography>
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
};

export const Email: React.FC<EmailProps> = ({email, viewHidden }) => {
  return viewHidden ? (
    <Grid item>
      <AlternateEmailIcon
        color="primary"
        fontSize="small"
        sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
      />
      <Typography
        sx={{ display: "inline-block" }}
      >{`${email}`}</Typography>
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
};

export const Linkedin: React.FC<LinkedinProps> = ({ linkedin, viewHidden }) => {
  //check if exists
  if (!linkedin) return;

  return viewHidden ? (
    <Grid item>
      <LinkedInIcon
        color="primary"
        fontSize="small"
        sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
      />
      <Link href={linkedin} target="_blank" color="primary">
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
};

export const WebsiteUrl: React.FC<WebsiteUrlProps> = ({
  website,
  viewHidden,
}) => {
  //check if exists
  if (!website) return;
  return viewHidden ? (
    <Grid item>
      <LinkIcon
        color="primary"
        fontSize="small"
        sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
      />
      <Link href={website} target="_blank">
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
};

export const Education: React.FC<EducationProps> = ({
  education,
  viewHidden,
}) => {
  if (!education) return;

  const list = education;

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
};
