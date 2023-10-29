import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";

const bgColors = ["#00A8E8", "#63E5C5", "#F28808"];
const percentColors = ["#CBF6EB", "#B1F2E2", "#7DE9CE", "#63E5C5"];
interface JobPostTypes {
  job_id?: number;
  logo_src?: string;
  job_title?: string;
  job_type?: string;
  match_percent: string;
  job_summary?: string;
  work_model?: string;
  start_on?: string;
}

interface JobCardProps {
  job_data: JobPostTypes;
}

export const JobCard: React.FC<JobCardProps> = ({ job_data }) => {
  const noImgBg = bgColors[Math.floor(Math.random() * 3)];
  const chipBg =
    percentColors[Math.ceil(Math.round(+job_data.match_percent) * 0.04) - 1];
  const searchTerm = "search term coming soon";

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: "16px", maxWidth: "354px", height: "510px" }}
    >
      {/*backgroundColor as a variable causing an error  */}
      <CardMedia sx={{ height: 188, maxWidth: "360px" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "188px",
            textAlign: "center",
            backgroundColor: `${!job_data.logo_src ? noImgBg : "white"}`,
          }}
        >
          {job_data.logo_src && (
            <Image
              alt="company logo"
              src={job_data.logo_src}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%" }} // optional
            />
          )}
        </Box>
      </CardMedia>

      <CardContent sx={{ px: { sm: 2, xs: 1 } }}>
        <Grid container spacing={1} direction="row">
          <Grid item xs={8}>
            <Typography
              color="primary"
              sx={{
                fontWeight: "medium",
                height: "50px",
                overflow: "hidden",
              }}
            >
              {job_data.job_title?.toUpperCase()}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Chip
              sx={{
                borderRadius: "10px",
                backgroundColor: `${chipBg}`,
              }}
              label={`${job_data.match_percent}% match`}
            />
          </Grid>
          <Grid item sm={12} sx={{}}>
            <Typography
              variant="body2"
              sx={{
                height: "100px",
                overflow: "hidden",
              }}
            >
              {job_data.job_summary}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 3 }}>
          <Grid
            item
            xs={4}
            sx={{ textAlign: "center", borderRight: "solid 2px lightgrey" }}
          >
            <Typography variant="body2">
              <strong>JOB TYPE</strong>
            </Typography>
            <Typography variant="body2" color="grey">
              {job_data.job_type}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ textAlign: "center", borderRight: "solid 2px lightgrey" }}
          >
            <Typography variant="body2">
              <strong>WORK MODEL</strong>
            </Typography>
            <Typography variant="body2" color="grey">
              {job_data.work_model}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Typography variant="body2">
              <strong>START ON</strong>
            </Typography>
            <Typography variant="body2" color="grey">
              {job_data.start_on}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 3 }}>
        <Grid container>
          <Grid item xs={6}>
            <IconButton aria-label="delete">
              <FavoriteBorderIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Button variant="contained" sx={{ textTransform: "none" }}>
              Apply
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default JobCard;
