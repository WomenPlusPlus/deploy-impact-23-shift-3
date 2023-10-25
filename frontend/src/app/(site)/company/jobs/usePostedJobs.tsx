import { usePostedJobsForCompany } from "@/lib/usePostedJobsForCompany";
import { JobPostNew } from "@/app/(site)/company/jobs/types";

export const usePostedJobs = (companyId: string): JobPostNew[] => {
  const { data = [] } = usePostedJobsForCompany(companyId);
  console.log(data);
  return data;
};
