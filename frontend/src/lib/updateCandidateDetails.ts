"use client";

// to get the details of a candidate by id
import axios from "axios";

const DATA_SOURCE_URL =
  "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/";

export async function UpdateCandidateDetails(data: any) {
  try {
    console.log("in patch", data[0]);

    const response = await axios.patch(`${DATA_SOURCE_URL}candidates/${data[1]}/`, data[0]);

    return response.data;
  } catch (error: any) {
    console.log("error Catch in get candidate details api call", error);
    throw new Error("Error fetching data:", error);
  }
}
