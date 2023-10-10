"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dashboard from "@/components/admin/dashboard/Dashboard";

import { redirect } from "next/navigation";

export default function AdminPage() {

  return (
    <Box sx={{ backgroundColor:"#FCF8F4"}}>
      <Dashboard />
    </Box>
  );
}
