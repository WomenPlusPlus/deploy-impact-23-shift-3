"use client"
import AppBar from "@mui/material/AppBar"
import DashboardIcon from "@mui/icons-material/Dashboard"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
// import { Interface } from "readline"

import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import Link from "next/link"


interface HeaderProps {
  sections: ReadonlyArray<{
    title: string
    url: string
  }>

}

export default function SubHeader(props: HeaderProps) {
  const { sections, title } = props

  const DRAWER_WIDTH = 240

  return (


      <Toolbar
      
        component="nav"
         variant="dense"
        sx={{
          justifyContent: "space-between",
          overflowX: "auto",
          maxWidth: "70%",
          borderBottom: 1,
          borderColor: "divider",
          // mx:'auto'
        }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
  
  )
}
