import { usePostedJobsForCompany } from "@/lib/usePostedJobsForCompany";

export const usePostedJobs = (companyId: string) => {
  return usePostedJobsForCompany(companyId);
};
