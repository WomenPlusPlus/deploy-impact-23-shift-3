import axios from "axios";
import API_BASE_URL from "@/config";
import { JobPostNew } from "@/app/(site)/company/jobs/types";
import { useQuery } from "@tanstack/react-query";

export const getPostedJobsByCompany = async (companyId?: string) => {
  const response = await axios.get<JobPostNew[]>(
    `${API_BASE_URL}/api/company_jobs/${companyId}`,
  );
  return response.data;
};

export const usePostedJobsForCompany = (companyId: string) => {
  return useQuery(["usePostedJobsForCompany", companyId], () =>
    getPostedJobsByCompany(companyId),
  );
};
