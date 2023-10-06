"use client"

import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import { Alert } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import { useState } from "react"

import { redirect } from "next/navigation";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Shit+Enter
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default function SignInPage() {


  // TODO: Temporary for layout, will change when react query is implemented
  const [email, setEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [idError, setIsError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [signedIn, setSignedIn] = useState(false)



  // TODO: only temp until authentication and roles is fully working
  if(signedIn){
    redirect("/candidate")
  }

  const handelEmailChange = (event) => {
    setEmail(event.target.value)
  }

  // TODO: for MVP -  only use basic browser validation
  // const validateEmail = () => {
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  //   if (!emailRegex.test(email)) {
  //     setError("Please enter a valid email address")
  //   } else {
  //     setError("")
  //   }
  // }

  const makeApiCall = async (data: FormData) => {
    const email = data.get("email")
    const password = data.get("password")

    // TODO: api always returns 200 -- should be changed to 401 when user login incorrect(backend task)
    // TODO: temp
    const res = await fetch(
      "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/login/",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    )

    const loginData: Promise<LoginError> = res.json()
    const showLoginData = await loginData

    console.log("showLoginData", showLoginData)

    if (showLoginData.error) {
      console.log("error", showLoginData.error_description)
      setErrorMsg(showLoginData.error_description)
    }else{
      console.log("success you are in");
      setSignedIn(true);      
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setErrorMsg('')

    makeApiCall(data)
  }

  return (

        <Box
          sx={{
            my: 8,
            mx: 4,
            px:5,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            maxWidth:"80%",
           
          }}
        >

<Typography component="h1" variant="h4" align="left">
        Welcome to SHIFT!
      </Typography>

            {/* <LockOutlinedIcon /> */}
            <Typography component="h3" variant="h5" align="left" sx={{mt:2}}>
        Sign in
      </Typography>

          {/* <Typography component="h1" variant="h5">Sign in</Typography> */}

          <Box
            component="form"
            // noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              type="email"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Link href="/forgot" variant="body2" >
                  Forgot password?
                </Link>

            <Box sx={{marginTop:'10px'}}>{errorMsg && <Alert severity="error">{errorMsg}</Alert>}</Box>
            <Box sx={{textAlign:'right', mb:1}}>
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,}}
            >
              Sign In
            </Button>
            </Box>
            <Divider variant="middle" />
            {/* <Copyright sx={{ mt: 5 }} /> */}
            <Grid container>
          <Grid item>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 5 }}
            >
              Not already on SHIFT? {" "}<Link color="inherit" href="/signup?emailhere.co.uk">Sign up</Link>
            </Typography>
          </Grid>
        </Grid>
          </Box>
        </Box>


  )
}
