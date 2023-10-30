import axios from "axios";
import API_BASE_URL from "@/config";
import { useQuery } from "@tanstack/react-query";
import { JobPost } from "@/app/(site)/company/jobs/types";

export const getPostedJobsByCompany = async (companyId?: string) => {
  const response = await axios.get<JobPost[]>(
    `${API_BASE_URL}/api/company_jobs/${companyId}`,
  );
  return response.data;
};

export const usePostedJobsForCompany = (companyId: string) => {
  return useQuery(["usePostedJobsForCompany", companyId], () =>
    getPostedJobsByCompany(companyId),
  );
};

export const usePostedJobForCompany = (
  companyId: string = "none",
  jobId: string = "none",
) => {
  const { data, ...rest } = usePostedJobsForCompany(companyId);

  return { data: data?.find((job) => `${job.job_id}` === `${jobId}`), ...rest };
};
