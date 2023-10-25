import { useCandidatesForJob } from "@/lib/useCandidatesForJob";

export const useMatchedCandidates = (jobId: string) => {
  return useCandidatesForJob(jobId);
};
