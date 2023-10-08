import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "tomato",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">Footer content here!</Typography>
      </Container>
    </Box>
  );
}
