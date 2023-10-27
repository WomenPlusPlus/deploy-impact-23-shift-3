import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import logo from "../../../public/images/logo.png";
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";

const data = {
  job_title: "software developer",
  match_percent: "95",
  job_summary:
    "Lorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidunt orci  mauris aliquet eget gravida. Tempus vel bibendum eget felis parturient varius eget.",
  job_type: "Internship",
  work_model: "Remote",
  start_on: "08/01/2024",
  logo_src:"/images/jobs/job-1.png"
};

const data2 = {
    job_title: "software developer",
    match_percent: "95",
    job_summary:
      "Lorem ipsum dolorncidLorem ipsum dolor Aius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidunt orci  mauris aliquet eget gravida. Tempus vel bibendum eget felis parturient varius eget.",
    job_type: "Internship",
    work_model: "Remote",
    start_on: "08/01/2024",
    logo_src:""
  };

  const bgColors = ["#00A8E8", "#63E5C5", "#F28808"];

export default function Job() {
    function getRandomBgColor(){
        const randomNumber = Math.floor(Math.random()*3); 
        return bgColors[randomNumber];
    }
    // let bg = getRandomBgColor;

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: "16px", maxWidth: "354px", height: "510px" }}
    >
      <CardMedia sx={{ height: 188, maxWidth: "360px" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "188px",
            textAlign: "center",
            backgroundColor: `${!data2.logo_src?getRandomBgColor():"white"}`,
          }}
        >
            {data2.logo_src &&
          (<Image
            alt="company logo"
            src={data2.logo_src}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }} // optional
          />)
        }
        </div>
      </CardMedia>

      <CardContent sx={{ px: { sm: 2, xs: 1 } }}>
        <Grid container spacing={1} direction="row">
          <Grid item xs={8}>
            <Typography
              color="primary"
              sx={{
                fontWeight: "medium",
                height: "50px",
                overflow: "hidden !important",
                textOverflow: "ellipsis",
              }}
            >
              {data.job_title.toUpperCase()}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Chip
              sx={{
                borderRadius: "10px",
                backgroundColor: "#F6F7FB",
              }}
              label={`${data.match_percent}% match`}
            />
          </Grid>
          <Grid item sm={12} sx={{}}>
            <Typography
              variant="body2"
              sx={{
                maxHeight: "100px",
                textOverflow: "ellipsis",
                overflow: "hidden !important",
              }}
            >
              {data.job_summary}
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
              {data.job_type}
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
              {data.work_model}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Typography variant="body2">
              <strong>START ON</strong>
            </Typography>
            <Typography variant="body2" color="grey">
              {data.start_on}
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
}
