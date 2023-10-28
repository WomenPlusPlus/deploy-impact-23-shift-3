"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import JobCard from "@/components/site/candidateJobs/jobCard";
import { SearchBar } from "@/app/(site)/company/searchBar";
import { map } from "cypress/types/bluebird";
import { useState } from "react";

const jobsData = [
  {
    job_id: 1,
    job_title: "software developer With a very long title",
    match_percent: "29",
    job_summary:
      "Lorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidunt orci  mauris aliquet eget gravida. Tempus vel bibendum eget felis parturient varius eget.",
    job_type: "Internship",
    work_model: "Remote",
    start_on: "08/01/2024",
    logo_src: "/images/jobs/job-1.png",
  },
  {
    job_id: 2,
    job_title: "Frontend developer",
    match_percent: "60",
    job_summary:
      "Lorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidunt orci  mauris aliquet eget gravida. Tempus vel bibendum eget felis parturient varius eget.",
    job_type: "Internship",
    work_model: "Hybrid",
    start_on: "08/01/2024",
    logo_src: "/images/jobs/job-2.png",
  },
  {
    job_id: 3,
    job_title: "Frontend developer",
    match_percent: "80",
    job_summary:
      "Lorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidunt orci  mauris aliquet eget gravida. Tempus vel bibendum eget felis parturient varius eget.",
    job_type: "Internship",
    work_model: "Hybrid",
    start_on: "08/01/2024",
    logo_src: "",
  },
  {
    job_id: 4,
    job_title: "Frontend developer",
    match_percent: "80",
    job_summary:
      "Lorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidunt orci  mauris aliquet eget gravida. Tempus vel bibendum eget felis parturient varius eget.",
    job_type: "Internship",
    work_model: "Hybrid",
    start_on: "08/01/2024",
    logo_src: "/images/jobs/job-3.png",
  },
  {
    job_id: 5,
    job_title: "Frontend developer",
    match_percent: "72",
    job_summary:
      "Lorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidunt orci  mauris aliquet eget gravida. Tempus vel bibendum eget felis parturient varius eget.",
    job_type: "Internship",
    work_model: "Hybrid",
    start_on: "08/01/2024",
    logo_src: "",
  },
  {
    job_id: 6,
    job_title: "Frontend developer",
    match_percent: "49",
    job_summary:
      "Lorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidLorem ipsum dolor sit amet consectetur. Venenatis varius pharetra tortor mattis purus morbi convallis feugiat sed. A tincidunt orci  mauris aliquet eget gravida. Tempus vel bibendum eget felis parturient varius eget.",
    job_type: "Internship",
    work_model: "Hybrid",
    start_on: "08/01/2024",
    logo_src: "",
  },
  {
    job_id: 7,
    job_title: "Frontend developer",
    match_percent: "95",
    job_summary: "Lorem ipsum rs varius pharetra tortor matti",
    work_model: "Hybrid",
    start_on: "08/01/2024",
    logo_src: "",
  },
];

export default function MyJobsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <Container sx={{ px: { xs: 0 } }}>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        placeholder={"Search for job post"}
      />

      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {jobsData.map((job, i) => {
          return <JobCard key={job.job_id} job_data={job} />;
        })}
      </Box>
    </Container>
  );
}
