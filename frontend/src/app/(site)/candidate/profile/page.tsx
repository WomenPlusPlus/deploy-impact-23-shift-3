"use client";

import * as React from "react";
import { useContext, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
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
import Autocomplete from "@mui/material/Autocomplete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
//mport { styled } from '@mui/system';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

//  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
// const StyledTextarea = styled(TextareaAutosize)(
//   ({ theme }) => `
//   width: 320px;
//   font-family: IBM Plex Sans, sans-serif;
//   font-size: 0.875rem;
//   font-weight: 400;
//   line-height: 1.5;
//   padding: 12px;
//   border-radius: 12px 12px 0 12px;

//   background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};

//   box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

//   &:hover {
//     border-color: ${blue[400]};
//   }

//   &:focus {
//     border-color: ${blue[400]};
//     box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
//   }

//   // firefox
//   &:focus-visible {
//     outline: 0;
//   }
// `,
// );



// import { fetchCandidate } from "@/lib/fetch-candidate";
const countryListPlaceholder = [
  {
    text: "England",
    id: 1,
  },
  {
    text: "Switzerland",
    id: 2,
  },
  {
    text: "Germany",
    id: 3,
  },
];

interface CountryOptionType {
  text: string;
  id: number;
}

// TODO: getUser data based on user id save the information and
const userId = 1;
// save the information to use to prefill the form

interface Details {
  first_name: string;
  last_name: string;
  preferred_name: string;
  values_text: string;
  related_experience: string;
  desired_job: string;
  personality_description: string;
  street_address: string;
  house_number: string;
  postal_code: number;
  city: string;
  phone_number_region: number;
  phone_number: number;
  email_adress: string;
  birth_date: number;
  notice_period_months: number;
  file_cv: string;
  preferred_work_id: number;
  accepted_privacy: boolean;
  skip_tutorial: boolean;
  preferred_work_model: string;
  country: string;
  work_permit: string;
  status: string;
  invited_by: string;
}

import { getCandidateDetails } from "@/lib/getCandidateDetails";
import { UpdateCandidateDetails } from "@/lib/updateCandidateDetails";
import { Details } from "@mui/icons-material";

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

  const [state, setState] = useState<Details>({});

  const defaultProps = {
    options: countryListPlaceholder,
    getOptionLabel: (option: CountryOptionType) => option.text,
  };

  function handleChange(element: any) {
    const value = element.target.value;
    setState({
      ...state,
      [element.target.name]: value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());
    // console.log('values', values);

    updateCandidate.mutate(values);
  }

  const signInContext = useContext(SignInProviderContext);

  console.log("context", signInContext);

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const queryCandidate = useQuery({
    queryKey: ["candidateDetails"],
    queryFn: getCandidateDetails,
  });

  // update candidate info
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
      <Paper sx={{ px: 3, py: 3, borderRadius: "16px", mb: 3 }} elevation={3}>
        <Box>
          <Typography component="h2" variant="h6">
            Basic info
          </Typography>
          <Typography component="p" variant="caption">
            Indicates required*
          </Typography>
        </Box>

        <Grid
          container
          my={3}
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid item sm={4} sx={{}}>
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

          <Grid item sm={4} sx={{}}>
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
          </Grid>
          <Grid item sm={4} sx={{}}>
            <TextField
              autoComplete="false"
              name="preferred_name"
              id="preferred_name"
              size="small"
              value={state.preferred_name || ""}
              label="Preferred name*"
              fullWidth
              onChange={handleChange}
            />
            <Typography
              component="p"
              variant="caption"
              sx={{ mt: 1, lineHeight: "1.2" }}
            >
              Tell us how would you like to be presented in your candidate
              profile.
            </Typography>
          </Grid>
          <Grid item sm={12} sx={{ paddingLeft: "10px" }}>
            <TextField
              type="date"
              autoComplete="false"
              name="birth_date"
              id="birth_date"
              size="small"
              value={state.birth_date || ""}
              label="Date of Birth"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
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
      {/* Section Contact info */}
      <Paper
        sx={{ px: 3, py: 3, borderRadius: "16px", marginBottom: "3px" }}
        elevation={3}
      >
        <Box>
          <Typography component="h2" variant="h6">
            Contact info
          </Typography>
          <Typography component="p" variant="caption">
            Indicates required*
          </Typography>
        </Box>

        <Grid
          container
          my={3}
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid item sm={3} sx={{}}>
            <TextField
              id="phone_number_region"
              name="phone_number_region"
              autoComplete="false"
              size="small"
              value={state.phone_number_region || ""}
              label="Phone number region*"
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={9} sx={{}}>
            <TextField
              autoComplete="false"
              name="phone_number"
              id="phone_number"
              size="small"
              value={state.phone_number || ""}
              label="Phone number*"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12} sx={{}}>
            <TextField
              type="email"
              autoComplete="false"
              name="email_adress"
              id="email_adress"
              size="small"
              value={state.email_adress || ""}
              label="Email address"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={9} sx={{ paddingLeft: "10px" }}>
            <TextField
              autoComplete="false"
              name="street_address"
              id="street_address"
              size="small"
              value={state.street_address || ""}
              label="Street"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={3} sx={{ paddingLeft: "10px" }}>
            <TextField
              autoComplete="false"
              name="house_number"
              id="house_number"
              size="small"
              value={state.house_number || ""}
              label="House number"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={9} sx={{ paddingLeft: "10px" }}>
            <TextField
              autoComplete="false"
              name="city"
              id="city"
              size="small"
              value={state.city || ""}
              label="City"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={3} sx={{ paddingLeft: "10px" }}>
            <TextField
              autoComplete="false"
              name="postal_code"
              id="postal_code"
              size="small"
              value={state.postal_code || ""}
              label="Postal code"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12} sx={{ paddingLeft: "10px" }}>
            {/* <TextField
              autoComplete="false"
              name="country"
              id="country"
              size="small"
              value={state.country || ""}
              label="Country"
              fullWidth
              onChange={handleChange}
            /> */}
            <Autocomplete
              {...defaultProps}
              size="small"
              disablePortal
              id="country-id"
              // onChange={handleChange}
              onChange={(event: any, newValue: CountryOptionType | null) => {
                // setValue(newValue);
                handleChange;
              }}
              // value={state.country || ""}
              options={countryListPlaceholder}
              //renderInput={(params) => <TextField  {...params} name={"country"} value={state.country || ""} label={"Country"} />}
              // renderInput={(params) => <TextField  {...params}  label="Country" />}
              renderInput={(params) => (
                <TextField {...params} label="Country" />
              )}
            />
          </Grid>
          <Grid item>
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

      {/* Professional profile Intro starts here! */}
      <Grid container sx={{ my: 3 }}>
        <Grid item sm={12}>
          <Typography variant="h5" component="h1">
            Your Professional profile
          </Typography>

          <Typography variant="body1" component="p">
            Shine as the professional you are, enter the information that
            matters the most to find your perfect job match.
          </Typography>
        </Grid>
      </Grid>
      {/* Professional profile start */}
      <Paper
        sx={{ px: 3, py: 3, borderRadius: "16px", marginBottom: "3px" }}
        elevation={3}
      >
        <Box>
          <Typography component="h2" variant="h6">
            Your Professional profile
          </Typography>
          <Typography component="p" variant="caption">
            Indicates required*
          </Typography>
        </Box>

        <Grid
          container
          my={3}
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid item sm={12}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload CV
              <VisuallyHiddenInput type="file" />
            </Button>

            <Typography component="p" variant="caption" sx={{ mt: 1 }}>
              *Please upload documents as .PDF, .JPG, .DOC. Max size 500MB
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload Documents
              <VisuallyHiddenInput type="file" />
            </Button>
            <Typography component="p" variant="caption" sx={{ mt: 1 }}>
              *Please upload documents as .PDF, .JPG, .DOC. Max size 1GB
            </Typography>
          </Grid>

          <Grid item sm={12}>
            {/* <StyledTextarea
              maxRows={4}
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              defaultValue="tejdjdjd"
            /> */}
          </Grid>
          <Grid item sm={9} sx={{ paddingLeft: "10px" }}>
            <TextField
              autoComplete="false"
              name="street_address"
              id="street_address"
              size="small"
              value={state.street_address || ""}
              label="Street"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={3} sx={{ paddingLeft: "10px" }}>
            <TextField
              autoComplete="false"
              name="house_number"
              id="house_number"
              size="small"
              value={state.house_number || ""}
              label="House number"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={9} sx={{ paddingLeft: "10px" }}>
            <TextField
              autoComplete="false"
              name="city"
              id="city"
              size="small"
              value={state.city || ""}
              label="City"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={3} sx={{ paddingLeft: "10px" }}>
            <TextField
              autoComplete="false"
              name="postal_code"
              id="postal_code"
              size="small"
              value={state.postal_code || ""}
              label="Postal code"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12} sx={{ paddingLeft: "10px" }}></Grid>
          <Grid item>
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
    </Container>
  );
}
