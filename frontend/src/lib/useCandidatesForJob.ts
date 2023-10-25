"use client";
import API_BASE_URL from "@/config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { JobWithMatchedCandidates } from "@/app/(site)/company/candidates/types";

const getData = (data: JobWithMatchedCandidates | undefined) => {
  if (!data || !Array.isArray(data.matches)) return [];

  return data.matches.map((candidate) => ({
    ...candidate,
    job_title: data.job_title,
  }));
};

const getCandidatesForJob = async (jobId: string) => {
  const response = await axios.get<JobWithMatchedCandidates>(
    `${API_BASE_URL}/api/jobs/${jobId}/`,
  );
  return getData(response.data);
};

export const useCandidatesForJob = (jobId: string) => {
  return useQuery(["useCandidatesForJob", jobId], () =>
    getCandidatesForJob(jobId),
  );
};
