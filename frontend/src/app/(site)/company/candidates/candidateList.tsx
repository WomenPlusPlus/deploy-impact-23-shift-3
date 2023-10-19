import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { Candidate } from "@/app/(site)/company/candidates/candidateInterface";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

interface CandidateListProps {
  candidates: Candidate[];
}
export const CandidateList: React.FC<CandidateListProps> = ({
  candidates = [],
}) => {
  return (
    <Grid container spacing={2} padding={1} sx={{ overflowY: "auto" }}>
      {candidates.length === 0 && (
        <Box padding={3}>
          <Typography>No candidates found...</Typography>
        </Box>
      )}
      {candidates.map((candidate) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={4} key={1}>
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
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginX: "16px",
                  marginY: "12px",
                  padding: 0,
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
                <Button
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#63E5C5",
                    fontSize: "14px",
                    textTransform: "none",
                  }}
                >
                  95% match
                </Button>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "left",
                  marginX: "16px",
                  marginTop: "16px",
                  marginBottom: "24px",
                  padding: 0,
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
                  marginX: "16px",
                  marginBottom: "24px",
                  padding: 0,
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
                    marginTop: "8px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor...
                </Typography>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginX: "16px",
                  marginBottom: "24px",
                  padding: 0,
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#1D1B20",
                      lineHeight: "16px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.06px",
                      marginBottom: "8px",
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
                    }}
                  >
                    SQL Server, Stored ...
                  </Typography>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    marginX: "8px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#1D1B20",
                      lineHeight: "16px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.06px",
                      marginBottom: "8px",
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
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
