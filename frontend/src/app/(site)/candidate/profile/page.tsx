"use client";

import * as React from "react";
import { useContext, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { SignInProviderContext } from "@/components/providers/SignInProvider";
// query
import {
  useQuery,
  useMutation,
  useQueryClient,
  hashQueryKey,
} from "@tanstack/react-query";
import { Avatar, Button, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

// import { fetchCandidate } from "@/lib/fetch-candidate";

// TODO: getUser data based on user id save the information and
const userId = 1;
// save the information to use to prefill the form

export type Details = {
  first_name: string;
  last_name: string;
};

import { getCandidateDetails } from "@/lib/getCandidateDetails";
import { UpdateCandidateDetails } from "@/lib/updateCandidateDetails";

export default function ProfilePage() {
  // const {isLoading, isError, data, error} = useQuery({
  //   queryKey: ["candidateDetails"],
  //   queryFn: getCandidateDetails,
  // });

  // if (queryCandidate.isLoading) return <h1>Loading...</h1>;
  // if (queryCandidate.isError) return <pre>{JSON.stringify(queryCandidate.error)}</pre>;
  // if (queryCandidate.isSuccess){
  //   const allDetails = data || null;

  // console.log("details i hope", allDetails);
  // setState(allDetails)

  const [state, setState] = useState({});

  function handleChange(element: any) {
    const value = element.target.value;
    setState({
      ...state,
      [element.target.id]: value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    updateCandidate.mutate(values);
  }

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const queryCandidate = useQuery({
    queryKey: ["candidateDetails"],
    queryFn: getCandidateDetails,
  });

  const updateCandidate = useMutation({
    mutationFn: UpdateCandidateDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["candidateDetails"]);
    },
  });


  // to setState
  useEffect(() => {
    if (queryCandidate.status === "success") {
      console.log("data", queryCandidate.data);

      setState(queryCandidate.data);
    }
  }, [queryCandidate.status, queryCandidate.data]);

  if (queryCandidate.isLoading) return <h1>Loading...</h1>;
  if (queryCandidate.isError) {
    return <pre>{JSON.stringify(queryCandidate.error)}</pre>;
  }


  // useContext is a Hook in react. It is a way to pass data through the component tree without having to pass props down manually at every level.
  // const signInContext = useContext(SignInProviderContext);
  // useQuery is a Hook provided by the React Query library, and it is used for fetching and managing data in React applications.
  // firstParam: key
  //secondParam: The function that performs the data-fetching operation. This function should return a Promise that resolves to the data you want to retrieve
  //thirdParam: optional configuration object that allows you to customize the behavior of the query. (for more info read doc)
  // const { data } = useQuery(
  //   ["candidates", signInContext.auth?.user?.id],
  //   () => fetchCandidate(signInContext.auth?.user?.id),
  //   {
  //     enabled: !!signInContext.auth?.user?.id,
  //   },
  // );

  return (
    <Container>
      <Grid container sx={{ my: 3 }}>
        <Grid item sm={8}>
          <Typography variant="h5" component="h1">
            Your personal profile
          </Typography>

          <Typography variant="body1" component="p">
            Let us know you better and how can you be contacted for an opening
            position.
          </Typography>
        </Grid>

        <Grid item sx={{ textAlign: "right" }} sm={4}>
          <Button variant="outlined">Preview your profile</Button>
        </Grid>
      </Grid>

      {/* Section one Basic info  move to component */}
      <Paper
        sx={{ px: 3, py: 3, borderRadius: "16px" }}
        elevation={3}
      >
        <Box>
          <Typography component="h2" variant="h6">
            Basic info
          </Typography>
          <Typography component="p" variant="caption">
            Indicates required*
          </Typography>
        </Box>

        <Grid container my={3} component="form" onSubmit={handleSubmit}>
          <Grid item sm={6} sx={{ paddingRight: "10px" }}>
            <TextField
              id="first_name"
              name="first_name"
              autoComplete="false"
              size="small"
              value={state.first_name || ""}
              label="First Name*"
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={6} sx={{ paddingLeft: "10px" }}>
            <TextField
              autoComplete="false"
              name="last_name"
              id="last_name"
              size="small"
              value={state.last_name || ""}
              label="Last Name*"
              fullWidth
              onChange={handleChange}
            />
            <Button
              disabled={updateCandidate.isLoading}
              type="submit"
              variant="outlined"
            >
              test update
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {/* Section one Basic info End */}
    </Container>
  );
}
