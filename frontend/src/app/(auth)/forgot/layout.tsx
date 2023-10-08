import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export const metadata = {
  title: "SHIFT - Forgot password",
  description: "Shift_Enter App - Authentication - Forgot password",
};

export default function ForgotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      {children}
    </Grid>
  );
}
