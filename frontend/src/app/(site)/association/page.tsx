import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function CandidatePage() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 5 }}>
          Association Home
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The dashboard will be here but not sure how that will look yet!
        </Typography>
        <Typography variant="body1">Coming soon...</Typography>
      </Box>
    </Container>
  );
}
