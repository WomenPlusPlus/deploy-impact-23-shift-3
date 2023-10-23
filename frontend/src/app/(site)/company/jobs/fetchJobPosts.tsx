import { JobPost } from "@/app/(site)/company/jobs/types";

const mockedJobPost1: JobPost = {
  job_id: "1",
  job_title: "Software Engineer",
  job_description:
    "We are looking for a Software Engineer to join our team and help us build innovative software products. As a Software Engineer, you will be responsible for designing, developing, and testing our software. You will also work with other engineers to integrate your code into our existing systems.",
  created_at: new Date("2023-06-01").getTime(),
  expires_at: new Date("2023-08-01").getTime(),
  starts_at: new Date("2023-10-01").getTime(),
  job_type: "Internship",
  work_model: "On site",
  open: true,
  matched_candidates: 3,
};

const mockedJobPost6: JobPost = {
  job_id: "6",
  job_title: "Web Developer",
  job_description:
    "We are looking for a Web Developer to join our team and help us build and maintain our high-traffic website. As a Web Developer, you will be responsible for developing and testing new features, fixing bugs, and optimizing the performance of our website. You will also work with other developers and designers to create a user-friendly and visually appealing website.",
  created_at: new Date("2023-07-01").getTime(),
  expires_at: new Date("2023-09-01").getTime(),
  starts_at: new Date("2023-11-01").getTime(),
  job_type: "Internship",
  work_model: "On site",
  open: true,
  matched_candidates: 7,
};

const mockedJobPost7: JobPost = {
  job_id: "7",
  job_title: "Mobile Developer",
  job_description:
    "We are looking for a Mobile Developer to join our team and help us develop and maintain our mobile apps. As a Mobile Developer, you will be responsible for designing, developing, and testing new features, fixing bugs, and optimizing the performance of our mobile apps. You will also work with other developers and designers to create user-friendly and visually appealing mobile apps.",
  created_at: new Date("2023-08-01").getTime(),
  expires_at: new Date("2023-10-01").getTime(),
  starts_at: new Date("2023-12-01").getTime(),
  job_type: "Internship",
  work_model: "On site",
  open: true,
  matched_candidates: 9,
};

const mockedJobPost8: JobPost = {
  job_id: "8",
  job_title: "QA Engineer",
  job_description:
    "We are looking for a QA Engineer to join our team and help us ensure the quality of our software products. As a QA Engineer, you will be responsible for developing and executing test plans, identifying and reporting bugs, and working with developers to fix bugs.",
  created_at: new Date("2023-09-01").getTime(),
  expires_at: new Date("2023-11-01").getTime(),
  starts_at: new Date("2024-01-01").getTime(),
  job_type: "Internship",
  work_model: "On site",
  open: true,
  matched_candidates: 18,
};

const mockedJobPost9: JobPost = {
  job_id: "9",
  job_title: "Data Analyst",
  job_description:
    "We are looking for a Data Analyst to join our team and help us analyze our data and extract insights. As a Data Analyst, you will be responsible for collecting, cleaning, and analyzing data, creating visualizations, and generating reports.",
  created_at: new Date("2023-10-01").getTime(),
  expires_at: new Date("2023-12-01").getTime(),
  starts_at: new Date("2024-02-01").getTime(),
  job_type: "Internship",
  work_model: "On site",
  open: true,
  matched_candidates: 0,
};

export default function getJobPosts(): JobPost[] {
  return [
    mockedJobPost1,
    mockedJobPost6,
    mockedJobPost7,
    mockedJobPost8,
    mockedJobPost9,
  ];
}
