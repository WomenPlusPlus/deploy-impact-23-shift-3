import { JobPost } from "@/app/(site)/company/jobs/types";
import React, { FormEvent } from "react";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import WorkIcon from "@mui/icons-material/Work";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

interface JobPreviewInterface {
  jobPost: JobPost;
}

export const JobPreview: React.FC<JobPreviewInterface> = ({
  jobPost,
}: JobPreviewInterface) => {
  const router = useRouter();
  const handleGoBackClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.replace(`/company/jobs`);
  };

  const handleFindMatchClick = (
    event: FormEvent<HTMLButtonElement>,
    jobId: string,
  ) => {
    event.preventDefault();
    router.replace(`/company/candidates/?jobId=${jobId}`);
  };
  console.log(jobPost);
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "left",
        }}
      >
        <Button
          type="submit"
          onClick={(event) => {
            handleGoBackClick(event);
          }}
          variant="outlined"
          size="large"
          sx={{
            textTransform: "none",
            borderRadius: "100px",
            color: "#14366F",
            cursor: "pointer",
          }}
          startIcon={<ArrowBackIcon />}
        >
          Go back to list
        </Button>
        <div style={{ flex: 1 }}></div>
        <Button
          type="submit"
          variant="outlined"
          size="large"
          sx={{
            textTransform: "none",
            borderRadius: "100px",
            color: "#14366F",
            marginRight: "32px",
            cursor: "pointer",
          }}
          startIcon={<AddIcon />}
        >
          Create new job
        </Button>
        <ButtonGroup
          disableElevation
          variant="outlined"
          aria-label="Disabled elevation buttons"
        >
          <Button
            type="submit"
            onClick={(event) => {
              handleFindMatchClick(event, jobPost.job_id);
            }}
            variant="outlined"
            size="large"
            sx={{
              textTransform: "none",
              borderRadius: "100px",
              color: "#74787E",
              cursor: "pointer",
            }}
          >
            Find match
          </Button>
          <Tooltip title="When you choose a balanced match, you'll still receive the same matching score, but we'll prioritize presenting suggested candidates in a balanced way to support underrepresented groups. It's all about creating a fair and diverse hiring experience">
            <Button
              type="submit"
              variant="outlined"
              size="large"
              sx={{
                textTransform: "none",
                borderRadius: "100px",
                color: "#74787E",
                cursor: "pointer",
              }}
            >
              Find balanced match
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Stack>
      <Card
        sx={{
          display: "flex",
          width: "100%",
          padding: 3,
          borderRadius: "28px",
          background: "#FFFCFA",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack sx={{ display: "flex", flexDirection: "row" }}>
            <Avatar
              src="/images/jobs/job-3.png"
              alt="Company logo"
              sx={{
                width: 172,
                height: 172,
                borderRadius: "50%",
                background: "red",
                backgroundSize: "cover",
              }}
            />
            <CardContent sx={{ paddingLeft: "32px" }}>
              <Typography
                sx={{
                  fontSize: "28px",
                  fontWeight: 500,
                  lineHeight: "32px",
                  textTransform: "uppercase",
                  paddingBottom: 3,
                }}
              >
                {jobPost.job_title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  letterSpacing: "0.15px",
                  textTransform: "uppercase",
                  paddingBottom: 3,
                }}
              >
                {jobPost.industry ? jobPost.industry : "swiss tech"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <LinkedInIcon sx={{ color: "#14366F" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    letterSpacing: "0.1px",
                    color: "#14366F",
                    textDecoration: "underline",
                    marginLeft: 1,
                    paddingRight: 4,
                    cursor: "pointer",
                  }}
                >
                  LinkedIn
                </Typography>
                <LinkIcon sx={{ color: "#14366F" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    letterSpacing: "0.1px",
                    color: "#14366F",
                    textDecoration: "underline",
                    marginLeft: 1,
                    paddingRight: 4,
                    cursor: "pointer",
                  }}
                >
                  Company Website
                </Typography>
                <HomeWorkIcon sx={{ color: "#14366F" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    letterSpacing: "0.1px",
                    marginLeft: 1,
                    paddingRight: 4,
                  }}
                >
                  {jobPost.location}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <WorkIcon sx={{ color: "#14366F" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    letterSpacing: "0.1px",
                    color: "#45494F",
                    marginLeft: 1,
                    paddingRight: 4,
                  }}
                >
                  Work model:{" "}
                  {jobPost.work_model ? jobPost.work_model : "Remote"}
                </Typography>
                <PermContactCalendarIcon sx={{ color: "#14366F" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    letterSpacing: "0.1px",
                    color: "#45494F",
                    marginLeft: 1,
                  }}
                >
                  Start date: 08/01/2024
                </Typography>
              </Box>
            </CardContent>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};
