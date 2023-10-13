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
import {
  useAutocomplete,
  UseAutocompleteProps,
} from "@mui/base/useAutocomplete";
import UploadIcon from "@mui/icons-material/Upload";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

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

// import { fetchCandidate } from "@/lib/fetch-candidate";
const countryListPlaceholder = ["England", "Switzerland", "Germany"];

// interface CountryOptionType {
//   text: string;
//   id: number;
// }

// TODO: getUser data based on user id
const userId = 1;

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

export default function ProfilePage() {
  const [state, setState] = useState<Object>({});

  function handleChange(element: any) {
    const value = element.target.value;

    setState({
      ...state,
      [element.target.name]: value,
    });
  }

  function handleCancel(e: any) {
    console.log("cancel", e.target.getAttribute("data-which"));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    updateCandidate.mutate(values);
  }

  // test to get context -- move
  //const signInContext = useContext(SignInProviderContext);
  // console.log("context", signInContext);

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

  if (queryCandidate.isLoading) {
    return (
      <Container sx={{ mt: 3 }}>
        <Typography variant="h5" component="h1">
          Your personal profile
        </Typography>

        <Typography variant="body1" component="p">
          Let us know you better and how can you be contacted for an opening
          position.
        </Typography>
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ bgcolor: "white", width: "100%", marginTop: "20px" }}
          height={20}
        />
      </Container>
      // <Skeleton variant="rounded" width={210} height={118} />
    );
  }
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
        sx={{ px: 3, py: 3, borderRadius: "16px", mb: 3 }}
        elevation={3}
        onSubmit={handleSubmit}
        component="form"
      >
        <Grid container>
          <Grid item sm={6}>
            <Box>
              <Typography component="h2" variant="h6">
                Basic info
              </Typography>
              <Typography component="p" variant="caption">
                Indicates required*
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={6} sx={{ textAlign: "right" }}>
            <Button
              disabled={updateCandidate.isLoading}
              onClick={handleCancel}
              data-which="basic"
              variant="contained"
              size="small"
              color="secondary"
            >
              Cancel
            </Button>{" "}
            <Button
              sx={{ ml: 2 }}
              disabled={updateCandidate.isLoading}
              type="submit"
              variant="contained"
              size="small"
            >
              Save
            </Button>
          </Grid>
        </Grid>

        <Grid container my={3} spacing={2}>
          <Grid item sm={4} xs={12}>
            <TextField
              // InputProps={{
              //   readOnly: true,
              // }}
              required
              id="first_name"
              name="first_name"
              autoComplete="false"
              size="small"
              value={state.first_name || ""}
              label="First Name"
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={4} xs={12}>
            <TextField
              required
              autoComplete="false"
              name="last_name"
              id="last_name"
              size="small"
              value={state.last_name || ""}
              label="Last Name"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextField
              required
              autoComplete="false"
              name="preferred_name"
              id="preferred_name"
              size="small"
              value={state.preferred_name || ""}
              label="Preferred Name"
              fullWidth
              helperText="Tell us how would you like to be presented in your candidate profile."
              onChange={handleChange}
            />
            {/* <Typography
              component="p"
              variant="caption"
              sx={{ mt: 1, lineHeight: "1.2" }}
            >
              Tell us how would you like to be presented in your candidate
              profile.
            </Typography> */}
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
          <Grid item></Grid>
        </Grid>
      </Paper>
      {/* Section one Basic info End */}
      {/* Section Contact info */}
      <Paper
        sx={{ px: 3, py: 3, borderRadius: "16px", marginBottom: "3px" }}
        elevation={3}
        onSubmit={handleSubmit}
        component="form"
      >
        <Grid container>
          <Grid item sm={6}>
            <Box>
              <Typography component="h2" variant="h6">
                Contact info
              </Typography>
              <Typography component="p" variant="caption">
                Indicates required*
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={6} sx={{ textAlign: "right" }}>
            <Button
              disabled={updateCandidate.isLoading}
              onClick={handleCancel}
              data-which="basic"
              variant="contained"
              size="small"
              color="secondary"
              // sx={{ color: "primary" }}
            >
              Cancel
            </Button>{" "}
            <Button
              sx={{ ml: 2 }}
              disabled={updateCandidate.isLoading}
              type="submit"
              variant="contained"
              size="small"
            >
              Save
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          my={3}
          spacing={2}
          // component="form"
          // onSubmit={handleSubmit}
        >
          <Grid item sm={3} xs={12}>
            <TextField
              required
              id="phone_number_region"
              name="phone_number_region"
              autoComplete="false"
              size="small"
              type="tel"
              value={+state.phone_number_region || ""}
              label="Phone number region"
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={9} xs={12}>
            <TextField
              required
              type="tel"
              autoComplete="false"
              name="phone_number"
              id="phone_number"
              size="small"
              value={+state.phone_number || ""}
              label="Phone Number"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
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
          <Grid item sm={9} xs={12}>
            <TextField
              required
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
          <Grid item sm={3} xs={12}>
            <TextField
              required
              type="number"
              autoComplete="false"
              name="house_number"
              id="house_number"
              size="small"
              value={+state.house_number || 0}
              label="House number"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={9} xs={12}>
            <TextField
              required
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
          <Grid item sm={3} xs={12}>
            <TextField
              required
              type=""
              autoComplete="false"
              name="postal_code"
              id="postal_code"
              size="small"
              value={+state.postal_code || ""}
              label="Postal code"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
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
            {/* <Autocomplete */}

            {/* size="small"
              disablePortal
              id="country"
              onChange={handleChange}
              options={countryListPlaceholder} */}

            {/* renderInput={(params) => (*/}
            {/* <TextField {...params} label="Country" name={"country"} value={state.country || ""} /> */}
            {/* <TextField
              fullWidth
              label="Country"
              name={"country"}
              value={state.country || ""}
            /> */}
            {/* TODO: need to contact gui about type of the Country field */}
            <Select
              fullWidth
              size="small"
              defaultValue={state.country || "Switzerland"}
              onChange={handleChange}
              inputProps={{ "aria-label": "Country" }}
            >
              <MenuItem value="Switzerland">Switzerland</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
              <MenuItem value="France">France</MenuItem>
            </Select>
            {/* )}  */}

            {/* /> */}
          </Grid>
          <Grid item>
            {/* <Button
              disabled={updateCandidate.isLoading}
              type="submit"
              variant="outlined"
            >
              test update
            </Button> */}
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
        onSubmit={handleSubmit}
        component="form"
      >
        <Grid container>
          <Grid item sm={6}>
            <Box>
              <Typography component="h2" variant="h6">
                Your Professional profile
              </Typography>
              <Typography component="p" variant="caption">
                Indicates required*
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={6} sx={{ textAlign: "right" }}>
            <Button
              disabled={updateCandidate.isLoading}
              onClick={handleCancel}
              data-which="basic"
              variant="contained"
              size="small"
              color="secondary"
            >
              Cancel
            </Button>{" "}
            <Button
              sx={{ ml: 2 }}
              disabled={updateCandidate.isLoading}
              type="submit"
              variant="contained"
              size="small"
            >
              Save
            </Button>
          </Grid>
        </Grid>

        <Grid container my={3} spacing={2}>
          <Grid item sm={12}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadIcon />}
            >
              Upload CV
              <VisuallyHiddenInput type="file" />
            </Button>

            <Typography component="p" variant="caption" sx={{ mt: 1 }}>
              Please upload documents as .PDF, .JPG, .DOC. Max size 500MB
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadIcon />}
            >
              Upload Documents
              <VisuallyHiddenInput type="file" />
            </Button>
            <Typography component="p" variant="caption" sx={{ my: 1 }}>
              Please upload documents as .PDF, .JPG, .DOC. Max size 1GB
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <TextField
              autoComplete="false"
              multiline
              maxRows={7}
              minRows={7}
              name="related_experience"
              id="related_experience"
              size="small"
              value={state.related_experience || ""}
              label=" related_experience"
              fullWidth
              onChange={handleChange}
            />
            <Typography component="p" variant="caption" sx={{ mt: 1 }}>
              Example of writing format to show your experience. Think about{" "}
              <strong>WHAT</strong> you did, <strong>HOW</strong> you achieved
              it, and the <strong>results</strong>.{" "}
            </Typography>
            <ul style={{ marginTop: 0, fontSize: "small" }}>
              <li>
                Example 1: Designing algorithms and flowcharts to create new
                software programs and systems.
              </li>
              <li>
                Example 2: Developing technical documentation to guide future
                software development projects.
              </li>
            </ul>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Select
              fullWidth
              defaultValue={state.work_permit || ""}
              onChange={handleChange}
              // displayEmpty
              size="small"
              inputProps={{ "aria-label": "Work permit label" }}
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No but I/'m a european citizen"}>
                No but I'm a european citizen
              </MenuItem>
              <MenuItem value={"No and I'm NOT a european citizen"}>
                No and I'm NOT a european citizen
              </MenuItem>
            </Select>
          </Grid>
          {/* <Grid item sm={12} sx={{ paddingLeft: "10px" }}></Grid> */}
          <Grid item sm={6} xs={12}>
            <TextField
              required
              autoComplete="false"
              name="notice_period_months"
              id="notice_period_months"
              size="small"
              value={state.notice_period_months || ""}
              label="Notice period months"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              required
              autoComplete="false"
              name="invited_by"
              id="invited_by"
              size="small"
              value={state.invited_by || ""}
              label="Invited by"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              required
              autoComplete="false"
              name="invited_by"
              id="invited_by"
              size="small"
              value={""}
              label="initiative badge"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Select
              fullWidth
              size="small"
              defaultValue={"German"}
              onChange={handleChange}
              inputProps={{ "aria-label": "Country" }}
            >
              <MenuItem value="German">German</MenuItem>
              <MenuItem value="French">French</MenuItem>
              <MenuItem value="English">English</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Select
              fullWidth
              size="small"
              defaultValue={"Proficiency"}
              onChange={handleChange}
              inputProps={{ "aria-label": "Country" }}
            >
              <MenuItem value="Proficiency">Proficiency</MenuItem>
              <MenuItem value="German">German</MenuItem>
              <MenuItem value="French">French</MenuItem>
              <MenuItem value="English">English</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
