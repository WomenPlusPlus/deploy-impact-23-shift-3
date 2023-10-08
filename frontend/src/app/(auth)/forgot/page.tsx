"use client"

import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"

import { Alert } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useState } from "react"

// query
import axios from "axios"
import {useMutation} from "@tanstack/react-query"

export default function ForgotPage() {
  // TODO: Temporary for layout, will change when react query is implemented
  const [email, setEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [idError, setIsError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Mutations
  const mutation = useMutation({
    mutationFn: (newCredentials) => {
      return axios.post(
        "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/recover/", newCredentials
      )
    },
  })

  // TODO: only temp until authentication and roles is fully working
  if(mutation.isSuccess){
    console.log('successMsg',mutation.data.data.msg);
   // redirect("/candidate")
  }

  //TODO: is always returning 200 ok when there is an error needs changing (backend)
  if(mutation.isError){
    console.log(mutation.data);
   // redirect("/candidate")
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const form_email = data.get("email")
    mutation.mutate({ email: form_email })
  }


  // const makeApiCall = async (data: FormData) => {
  //   const email = data.get("email")
  //   const password = data.get("password")

  //   // TODO: api always returns 200 -- should be changed to 401 when user login incorrect(backend task)
  //   // TODO: temp
  //   const res = await fetch(
  //     "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/recover/",
  //     {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     }
  //   )

  //   const loginData: Promise<LoginError> = res.json()
  //   const showLoginData = await loginData

  //   console.log("showLoginData", showLoginData)

  //   if (showLoginData.error) {
  //     console.log("error", showLoginData.error_description)
  //     setErrorMsg(showLoginData.error_description)
  //   }
  // }

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const data = new FormData(event.currentTarget)
  //   setErrorMsg("")

  //   makeApiCall(data)
  // }

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
      <Box>
      <Typography component="h1" variant="h4" align="left">
        Welcome to SHIFT!
      </Typography>

      <Typography component="h3" variant="h5" align="left" sx={{ mt: 2 }}>
        Forgot password
      </Typography>

      </Box>

      <Box
        component="form"
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

        <Box sx={{ marginTop: "10px" }}>
          {/* {errorMsg && <Alert severity="error">{errorMsg}</Alert>} */}
        </Box>
        <Box sx={{ textAlign: "right", mb: 1 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
        <Divider variant="middle" />
        <Grid container>
          <Grid item>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 5 }}
            >
              Not already on SHIFT?{" "}
              <Link color="inherit" href="/signup">
                Sign up
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
