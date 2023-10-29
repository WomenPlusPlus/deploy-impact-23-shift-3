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
        borderTop: 1,
        borderColor: "divider",
        backgroundColor: "#FCF8F4",
      }}
    >
      <Container>
        <Typography
          variant="subtitle2"
          sx={{ textAlign: "center", color: "GrayText" }}
        >
          ⇧⏎ 2023
        </Typography>
      </Container>
    </Box>
  );
}
