"use client";

//test api call for setup
import axios from "axios";

const DATA_SOURCE_URL =
  "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/";

// TODO:api calls need to be /skills/update etc.. so can use same call with params
// export async function getSkills(apiEndpoint: any) {
export async function getSkills() {
  try {
    // const response = await axios.get(`${DATA_SOURCE_URL}/${apiEndpoint}`)
    const response = await axios.get(`${DATA_SOURCE_URL}skills/`);
    return response.data;
  } catch (error: any) {
    console.log("error Catch in sills api call", error);
    throw new Error("Error fetching data:", error);
  }
}
