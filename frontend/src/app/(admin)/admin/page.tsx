"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Dashboard from "@/components/admin/dashboard/Dashboard";

export default function AdminPage() {
  return (
    <Box sx={{ backgroundColor: "#FCF8F4" }}>
      <Dashboard />
    </Box>
  );
}
