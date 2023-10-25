import { useCandidatesForJob } from "@/lib/useCandidatesForJob";
import { CandidateForJobList } from "@/app/(site)/company/candidates/types";

export const useMatchedCandidates = (jobId: string): CandidateForJobList[] => {
  const { data } = useCandidatesForJob(jobId);
  console.log(data);
  if (data && Array.isArray(data.matches)) {
    return (
      data?.matches?.map((candidate) => ({
        ...candidate,
        job_title: data.job_title,
      })) || []
    );
  }
  return [];
};
