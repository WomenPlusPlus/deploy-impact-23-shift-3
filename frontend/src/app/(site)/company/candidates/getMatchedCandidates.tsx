import { useCandidatesForJob } from "@/lib/useCandidatesForJob";
import { CandidateForJobList } from "@/app/(site)/company/candidates/types";

export const getMatchedCandidates = (jobId: string): CandidateForJobList[] => {
  const { data } = useCandidatesForJob(jobId);
  if (data && data?.matches.length > 0) {
    return data.matches.map((candidate) => ({
      ...candidate,
      job_title: data.job_title,
    }));
  }
  return [];
};
