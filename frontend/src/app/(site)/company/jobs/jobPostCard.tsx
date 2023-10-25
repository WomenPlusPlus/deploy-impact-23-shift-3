import { JobPostNew } from "@/app/(site)/company/jobs/types";
import React, { FormEvent } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

interface JobPostProps {
  job: JobPostNew;
}
export const JobPostCard: React.FC<JobPostProps> = ({ job }) => {
  const numberOfMatches = job.matches.length;
  const router = useRouter();
  const handleSubmit = (event: FormEvent<HTMLButtonElement>, jobId: string) => {
    event.preventDefault();
    router.replace(`/company/candidates/?jobid=${jobId}`);
  };
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: "12px",
          borderColor: "#102620",
          backgroundColor: "#FFFFFF",
          boxShadow: 3,
          "&:hover": {
            backgroundColor: "#C4C7D0",
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "12px",
            paddingTop: "12px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "#14366F",
              fontWeight: "500",
              lineHeight: "24px",
              letterSpacing: "0.15px",
              textTransform: "uppercase",
            }}
          >
            {job.job_title}
          </Typography>
          <div
            style={{
              borderRadius: "8px",
              padding: "10px 10px",
              display: "inline-block",
              backgroundColor: "#63E5C5",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
              letterSpacing: "0.1",
              whiteSpace: "nowrap",
            }}
          >
            {numberOfMatches} matches
          </div>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "left",
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#45494F",
              lineHeight: "20px",
              letterSpacing: "0.25px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {job.job_description}
          </Typography>
        </CardContent>
        <CardContent>
          <Stack
            flexGrow={0}
            width={"100%"}
            maxWidth={"100%"}
            minWidth={0}
            flexDirection={"row"}
            gap={"4px"}
            paddingTop={"16px"}
          >
            <Stack
              maxWidth={"33%"}
              justifyContent={"center"}
              textAlign={"center"}
              flex={1}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#1D1B20",
                  lineHeight: "16px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.06px",
                }}
              >
                Job Type
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#1D1B20",
                  lineHeight: "16px",
                  fontWeight: "400",
                  letterSpacing: "0.048px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {job.job_type ? job.job_type : "Internship"}
              </Typography>
            </Stack>
            <Divider orientation={"vertical"} flexItem />
            <Stack
              maxWidth={"33%"}
              justifyContent={"center"}
              textAlign={"center"}
              flex={1}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#1D1B20",
                  lineHeight: "16px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.06px",
                }}
              >
                Work model
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#1D1B20",
                  lineHeight: "16px",
                  fontWeight: "400",
                  letterSpacing: "0.048px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {job.work_model ? job.work_model : "Hybrid"}
              </Typography>
            </Stack>
            <Divider orientation={"vertical"} flexItem />
            <Stack
              maxWidth={"33%"}
              justifyContent={"center"}
              textAlign={"center"}
              flex={1}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#1D1B20",
                  lineHeight: "16px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.06px",
                }}
              >
                Start on
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#1D1B20",
                  lineHeight: "16px",
                  fontWeight: "400",
                  letterSpacing: "0.048px",
                }}
              >
                {new Date(job.last_day_to_apply).toLocaleDateString()}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "left",
            paddingTop: "16px",
          }}
        >
          <div>
            <IconButton aria-label="Chat">
              <MoreVertIcon />
            </IconButton>
          </div>
          <Button
            type="submit"
            onClick={(event) => handleSubmit(event, job.job_id)}
            variant="outlined"
            size="large"
            sx={{ textTransform: "none", borderRadius: "100px" }}
          >
            Show matches
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ textTransform: "none", borderRadius: "100px" }}
          >
            {job.open ? "Open" : "Not"}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};