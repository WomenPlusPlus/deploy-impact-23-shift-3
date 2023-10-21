import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { Candidate } from "@/app/(site)/company/candidates/candidateInterface";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface CandidateListProps {
  candidates: Candidate[];
}
export const CandidateList: React.FC<CandidateListProps> = ({
  candidates = [],
}) => {
  return (
    <Grid container spacing={2} padding={1} sx={{ overflowY: "auto" }}>
      {candidates.length === 0 && (
        <Card
          sx={{
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            borderRadius: "12px",
            borderColor: "#102620",
            backgroundColor: "#FFFFFF",
          }}
        >
          <CardContent sx={{ padding: 3 }}>
            <Typography>No candidates found...</Typography>
          </CardContent>
        </Card>
      )}
      {candidates.map((candidate) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={4} key={candidate.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: "12px",
                borderColor: "#102620",
                backgroundColor: "#FFFFFF",
                boxShadow: 3,
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
                  Job Position Name
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
                  }}
                >
                  95% match
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
                  }}
                >
                  PREF NAME
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#45494F",
                    letterSpacing: "0.25px",
                    lineHeight: "20px",
                  }}
                >
                  Current position
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
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor...
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
                  <Stack maxWidth={"48%"} justifyContent={"center"}>
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
                      SQL Server SQL Server SQL Server SQL Server SQL Server
                    </Typography>
                  </Stack>
                  <Divider orientation={"vertical"} flexItem />
                  <Stack maxWidth={"48%"} justifyContent={"center"}>
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
                      16/11/2023
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
      })}
    </Grid>
  );
};
