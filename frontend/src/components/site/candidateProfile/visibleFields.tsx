import React from "react";
import Typography from "@mui/material/Typography";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import WorkIcon from "@mui/icons-material/Work";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

import Grid from "@mui/material/Grid";

interface LocationProps {
  city?: string;
  country?: string;
}
interface WorkPermitProps {
  work_permit?: string;
}
interface StartOnProps {
  start_date?: number;
}

export const Location: React.FC<LocationProps> = ({ city, country }) => {
  return (
    <Grid item>
      <HomeWorkIcon
        color="primary"
        fontSize="small"
        sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
      />
      <Typography
        sx={{ display: "inline-block" }}
      >{`${city}`}</Typography>
    </Grid>
  );
};

export const WorkPermit: React.FC<WorkPermitProps> = ({ work_permit }) => {
  return (
    <Grid item>
      <WorkIcon
        color="primary"
        fontSize="small"
        sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
      />
      <Typography
        sx={{ display: "inline-block" }}
      >{`Work permit: ${work_permit}`}</Typography>
    </Grid>
  );
};

export const StartOn: React.FC<StartOnProps> = ({ start_date }) => {
  return (
    <Grid item>
      <PermContactCalendarIcon
        color="primary"
        fontSize="small"
        sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
      />
      <Typography
        sx={{ display: "inline-block" }}
      >{`Notice period: ${start_date || 0} months`}</Typography>
    </Grid>
  );
};
