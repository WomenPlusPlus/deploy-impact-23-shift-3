"use client"
import * as React from "react"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

// query
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

import { getSkills } from "@/components/skills"

// Create a client --- beleive this has been done in the provider
// const queryClient = new QueryClient()

// interface Skill {
//   skill_name: string;
// }

export default function CompanyPage() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({ queryKey: ["skills"], queryFn: getSkills })

  if (query.isLoading) return <h1>Loading...</h1>
  if (query.isError) return <pre>{JSON.stringify(query.error)}</pre>


  // Mutations -- only getting at the moment
  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ['todos'] })
  //   },
  // })

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" gutterBottom>
          Company coming one day...
        </Typography>
          <ul>
            {query.data?.map((skill:Skills) => (
              <li key={skill.skill_name}>{skill.skill_name}</li>
            ))}
          </ul>
      </Box>
    </Container>
  )
}
