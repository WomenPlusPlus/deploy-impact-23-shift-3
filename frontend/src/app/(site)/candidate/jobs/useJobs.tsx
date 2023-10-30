import { getJobsForCandidate } from "@/lib/getJobsForCandidate";

export const useJobs = (userId: string) => {
  
  return getJobsForCandidate(userId);
};
