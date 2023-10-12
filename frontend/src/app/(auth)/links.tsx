import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function LinksSection() {
  return (
    <Box sx={{ fontSize: "12px", paddingBottom: 4 }}>
      <Typography sx={{ fontSize: "12px" }}>
        By clicking Sign In you agree to the SHIFT
      </Typography>
      <Box>
        <Link href="/" sx={{ textDecoration: "underline", color: "#14366F" }}>
          User Agreement, Privacy Policy
        </Link>
        <Typography sx={{ fontSize: "12px", display: "inline", marginX: 1 }}>
          and
        </Typography>
        <Link href="/" sx={{ textDecoration: "underline", color: "#14366F" }}>
          Cookie Policy
        </Link>
      </Box>
    </Box>
  );
}
