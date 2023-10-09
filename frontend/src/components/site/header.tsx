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

  title: string
}

export default function Header(props: HeaderProps) {
  const {title } = props

  const DRAWER_WIDTH = 240

  return (

      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          // backgroundColor: "#14366F",
         
        }}
      >
        <Button size="small">SHIFT</Button>

        <Button variant="outlined" size="small">
          <Link href="/signin" > Sign out</Link>
        
        </Button>
      </Toolbar>
  )
}
