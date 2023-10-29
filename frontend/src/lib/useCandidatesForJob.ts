"use client";
import API_BASE_URL from "@/config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  CandidateForJobList,
  JobWithMatchedCandidates,
} from "@/app/(site)/company/candidates/types";
import { getPostedJobsByCompany } from "@/lib/usePostedJobsForCompany";

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

export const useCandidatesForJob = (jobId: string, companyId?: string) => {
  return useQuery(["useCandidatesForJob", jobId, companyId], () => {
    if (jobId === "all") {
      return getPostedJobsByCompany(companyId).then((jobs) => {
        const allCandidates: CandidateForJobList[] = jobs.reduce(
          (candidates, job) => {
            const candidatesWithJobTitle = job.matches.map((candidate) => ({
              ...candidate,
              job_title: job.job_title,
            }));
            return candidates.concat(candidatesWithJobTitle);
          },
          [] as CandidateForJobList[],
        );

        return allCandidates;
      });
    }
    return getCandidatesForJob(jobId);
  });
};
