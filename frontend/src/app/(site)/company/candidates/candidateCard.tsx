import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import React from "react";
import Grid from "@mui/material/Grid";
import { CandidateForJobList } from "@/app/(site)/company/candidates/types";
import { getMatchingColor } from "@/components/site/getMatchingColor";
import { useRouter } from "next/navigation";

interface CandidateProps {
  candidate: CandidateForJobList;
  match: {
    job_title: string;
    matching_score: number;
  };
}
export const CandidateCard: React.FC<CandidateProps> = ({
  candidate,
  match,
}: CandidateProps) => {
  const router = useRouter();
  const handleViewProfileClick = (candidate_id: string) => {
    router.push("/company/profile?candidate_id=" + candidate_id);
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
            }}
          >
            {match.job_title}
          </Typography>
          <div
            style={{
              borderRadius: "8px",
              padding: "10px 10px",
              display: "inline-block",
              backgroundColor: getMatchingColor(match.matching_score),
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
              letterSpacing: "0.1",
            }}
          >
            {match.matching_score}% match
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
            {candidate.current_position}
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
            }}
          >
            {candidate.about_me}
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
            <Stack
              maxWidth={"48%"}
              justifyContent={"center"}
              textAlign={"center"}
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
                {candidate.hard_skills.join(", ")},
                {candidate.soft_skills.join(", ")}
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
                {new Date(candidate.start_on).toLocaleDateString()}
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
              <ChatBubbleIcon />
            </IconButton>
            <IconButton aria-label="Favorite">
              <FavoriteIcon />
            </IconButton>
          </div>
          <Button
            type="submit"
            onClick={() => handleViewProfileClick(candidate.candidate_id)}
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