"use client";

// to get the details of a candidate by id
import axios from "axios";
import API_BASE_URL from "@/config";

export async function getCandidateDetails(userId:any) {
  console.log("test params", userId);
  
  try {
    const response = await axios.get(`${API_BASE_URL}/api/candidates/${userId}/`);

    //TODO:cors needs to be enabled in django to alow the header    
    // const response = await axios.get(`${API_BASE_URL}/api/candidates/${userId}/`,{
    //   headers:{
    //     'Hide-Matches': true,
    //   }
    // });
    console.log("candidate_data", response.data);

    return response.data;
  } catch (error: any) {
    console.log("error Catch in get candidate details api call", error);
    throw new Error("Error fetching data:"+ error.message);
  }
}
