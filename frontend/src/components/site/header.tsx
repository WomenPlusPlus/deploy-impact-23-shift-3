"use client";
import Toolbar from "@mui/material/Toolbar";
// import { Interface } from "readline"
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Link from "next/link";

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;

  return (
    <Paper elevation={3} sx={{ backgroundColor: "#FCF8F4" }}>
      <Toolbar
        sx={{
          // borderBottom: 1,
          borderColor: "divider",
          // backgroundColor: "#14366F"
        }}
      >
        <Button size="small">SHIFT</Button>

        <Button variant="outlined" size="small">
          <Link href="/login"> Sign out</Link>
        </Button>
      </Toolbar>
    </Paper>
  );
}
