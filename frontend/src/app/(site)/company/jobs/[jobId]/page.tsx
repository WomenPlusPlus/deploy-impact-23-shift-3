"use client";

import { useContext } from "react";
import { SignInProviderContext } from "@/components/providers/SignInProvider";
import { usePostedJobForCompany } from "@/lib/usePostedJobsForCompany";

interface JobPageProps {
  params: {
    jobId: string;
  };
}
export default function JobPage(props: JobPageProps) {
  const jobId = props.params.jobId;
  const signInContext = useContext(SignInProviderContext);
  const companyId = signInContext.auth?.user?.id;
  const jobPostQuery = usePostedJobForCompany(companyId, jobId);

  return <>{jobId}</>;
}
