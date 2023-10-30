import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import React, { FormEvent } from "react";
import Grid from "@mui/material/Grid";
import { CandidateForJobList } from "@/app/(site)/company/candidates/types";
import { getMatchingColor } from "@/components/site/getMatchingColor";
import { useRouter } from "next/navigation";

interface CandidateProps {
  candidate: CandidateForJobList;
}

export const CandidateCard: React.FC<CandidateProps> = ({
  candidate,
}: CandidateProps) => {
  const router = useRouter();
  const handleViewCandidateProfile = (
    event: FormEvent<HTMLButtonElement>,
    candidateId: string,
  ) => {
    event.preventDefault();
    router.replace(`/company/candidates/${candidateId}/`);
  };
  const capitalizeWords = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
              paddingRight: "16px",
            }}
          >
            {capitalizeWords(candidate.job_title)}
          </Typography>
          <div
            style={{
              borderRadius: "8px",
              padding: "10px 10px 10px 16px",
              display: "inline-block",
              backgroundColor: getMatchingColor(candidate.full_match_score),
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
              letterSpacing: "0.1",
              whiteSpace: "nowrap",
            }}
          >
            {candidate.full_match_score.toFixed(2)}% match
          </div>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "left",
          }}
        >
          <Typography
            sx={{
              fontSize: "22px",
              color: "000",
              lineHeight: "28px",
              textTransform: "uppercase",
            }}
          >
            {candidate.preferred_name}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#45494F",
              letterSpacing: "0.25px",
              lineHeight: "20px",
            }}
          >
            Desired position
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "left",
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#1D1B20",
              lineHeight: "24px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.15px",
            }}
          >
            About me
          </Typography>
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
              minHeight: "40px",
            }}
          >
            {candidate.about_me ? candidate.about_me : <>&nbsp;</>}
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
          >
            <Stack width={"50%"} justifyContent={"center"} textAlign={"center"}>
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
                Skills
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
                {candidate.hard_skills ? candidate.hard_skills.join(", ") : " "}
                {candidate.soft_skills ? candidate.soft_skills.join(", ") : " "}
              </Typography>
            </Stack>
            <Divider orientation={"vertical"} flexItem />
            <Stack
              maxWidth={"48%"}
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
                {new Date(candidate.notice_period).toLocaleDateString()}
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
            paddingTop: "8px",
          }}
        >
          <div>
            <IconButton aria-label="Chat">
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton aria-label="Favorite">
              <FavoriteBorderIcon />
            </IconButton>
          </div>
          <Button
            type="submit"
            onClick={(event) => handleViewCandidateProfile(event, candidate.id)}
            variant="contained"
            size="large"
            sx={{ textTransform: "none", borderRadius: "100px" }}
          >
            View profile
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};
