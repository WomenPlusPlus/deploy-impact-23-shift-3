import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

// this was just test code please ignore

// export async function POST() {
//     const res = await fetch("http://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/login", {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//         // 'API-Key': process.env.DATA_API_KEY,
//       },
//       body: JSON.stringify({ email:'dkdkdk', password:'dhdh'}),
//     })

//     const data = await res.json()
//     console.log(data);

//     return Response.json(data)
//   }

// export async function GET(req:Request) {
//     const res = await fetch('http',{
//         headers:{
//             'Content-Type':'application/json',
//             'API-Key': process.env.DATA_API_KEY
//         }
//     })
//     const data = await res.json()

//    console.log(data);

//    return new Response('OK')

// }

// loged in json
// {
//     "access_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6ImdrdVlyMFVnYmF5MjVMRWQiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk2NTI3NTg5LCJpYXQiOjE2OTY1MjM5ODksImlzcyI6Imh0dHBzOi8vaWN1eHprbG5teW9iZmpneHVkb2guc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImI5YWRjNGVlLWI4ZjUtNDU5Yy1hODlmLWIyYTAyNWI5ZTE2YSIsImVtYWlsIjoiaGVjYXNpazg1M0BmaW5naHkuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE2OTY1MjM5ODl9XSwic2Vzc2lvbl9pZCI6IjllZGVlZWI1LThmOTYtNDdiZS1iODAwLWY0ODA0NDFmZTM0YSJ9.KuoZ34SWSMGqQutW25bmciep5kjMTBIDkEDgWcyy9vI",
//     "token_type": "bearer",
//     "expires_in": 3600,
//     "expires_at": 1696527589,
//     "user": {
//         "id": "b9adc4ee-b8f5-459c-a89f-b2a025b9e16a",
//         "aud": "authenticated",
//         "role": "authenticated",
//         "email": "hecasik853@finghy.com",
//         "email_confirmed_at": "2023-10-02T19:30:46.342961Z",
//         "phone": "",
//         "confirmed_at": "2023-10-02T19:30:46.342961Z",
//         "recovery_sent_at": "2023-10-03T00:23:16.219353Z",
//         "last_sign_in_at": "2023-10-05T16:39:49.07886623Z",
//         "app_metadata": {
//             "provider": "email",
//             "providers": [
//                 "email"
//             ]
//         },
//         "user_metadata": {},
//         "identities": [
//             {
//                 "id": "b9adc4ee-b8f5-459c-a89f-b2a025b9e16a",
//                 "user_id": "b9adc4ee-b8f5-459c-a89f-b2a025b9e16a",
//                 "identity_data": {
//                     "email": "hecasik853@finghy.com",
//                     "sub": "b9adc4ee-b8f5-459c-a89f-b2a025b9e16a"
//                 },
//                 "provider": "email",
//                 "last_sign_in_at": "2023-10-02T19:30:46.340318Z",
//                 "created_at": "2023-10-02T19:30:46.340365Z",
//                 "updated_at": "2023-10-02T19:30:46.340365Z"
//             }
//         ],
//         "created_at": "2023-10-02T19:30:46.338173Z",
//         "updated_at": "2023-10-05T16:39:49.080405Z"
//     }
// }
