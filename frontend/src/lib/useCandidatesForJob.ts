"use client";
import API_BASE_URL from "@/config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { JobWithMatchedCandidates } from "@/app/(site)/company/candidates/types";

const getCandidatesForJob = async (jobId?: string) => {
  const response = await axios.get<JobWithMatchedCandidates>(
    `${API_BASE_URL}/api/jobs/${jobId}/`,
  );
  return response.data;
};

export const useCandidatesForJob = (jobId?: string) => {
  return useQuery(["useCandidatesForJob", jobId], () =>
    getCandidatesForJob(jobId),
  );
};
