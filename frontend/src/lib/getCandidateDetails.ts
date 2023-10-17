"use client";

// to get the details of a candidate by id
import axios from "axios";

const DATA_SOURCE_URL =
  "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/";

// TODO:api calls need to be /skills/update etc.. so can use same call with params
// export async function getSkills(apiEndpoint: any) {
export async function getCandidateDetails() {
  try {
    // const response = await axios.get(`${DATA_SOURCE_URL}/candidates`,{params:{pname:"pvalue"}})
    const response = await axios.get(`${DATA_SOURCE_URL}candidates/1/`);

    //console.log("candidate_data", response.data);

    return response.data;
  } catch (error: any) {
    console.log("error Catch in get candidate details api call", error);
    throw new Error("Error fetching data:", error);
  }
}
