"use client"
import axios from "axios"

// not using at the moment
const DATA_SOURCE_URL =
  "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/login/"

// TODO:api calls need to be /skills/update etc.. so can use same call with params
// export async function getSkills(apiEndpoint: any) {


export async function checkLogin(data:any) {
  try {

    console.log('checklogin-data', data);
    
    // const response = await axios.get(`${DATA_SOURCE_URL}/${apiEndpoint}`)
    const response = await axios.post(`${DATA_SOURCE_URL}`)

    console.log("in checkLogin", response.data)

    return response.data
    
  } catch (error: any) {
    console.log("error Catch checkLogin", error)
    throw new Error("Error fetching data:", error)
  }
}


// const res = await fetch(
//   "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/signup/",
//   {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   }
// )