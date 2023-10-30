import axios from "axios";
import API_BASE_URL from "@/config";
import { CandidateDetailsInterface } from "@/components/site/candidateProfile/candidateInterface";
import { useQuery } from "@tanstack/react-query";

const getTheJobsByCandidate = async (userId: string) => {
  const response = await axios.get<CandidateDetailsInterface>(
    `${API_BASE_URL}/api/candidates/${userId}/`,
  );
  return response.data;
};

export const getJobsForCandidate = (userId: string) => {
  return useQuery(["useJobsForCandidate", userId], () =>
    getTheJobsByCandidate(userId),
  );
};
