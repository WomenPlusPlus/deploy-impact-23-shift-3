import { useCandidatesForJob } from "@/lib/useCandidatesForJob";

export const useMatchedCandidates = (jobId: string, companyId?: string) => {
  return useCandidatesForJob(jobId, companyId);
};
