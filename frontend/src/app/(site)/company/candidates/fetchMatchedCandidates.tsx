import { CandidateForJobList } from "@/app/(site)/company/candidates/types";

const mockedCandidate: CandidateForJobList = {
  candidate_id: "1",
  matching: [
    {
      job_title: "Software Engineer",
      matching_score: 95.0,
    },
    {
      job_title: "Data Scientist",
      matching_score: 75.0,
    },
  ],
  preferred_name: "John Doe",
  current_position: "Entry-Level Software Engineer",
  about_me:
    "I am a passionate entry-level software engineer with a strong desire to learn and grow. I'm dedicated to building and maintaining web applications and have the potential to contribute effectively. I am from an underprivileged environment and I'm eager to prove my skills.",
  hard_skills: ["Python", "Java", "JavaScript", "SQL"],
  soft_skills: ["Communication", "Problem-Solving", "Teamwork", "Adaptability"],
  start_on: new Date("2023-11-01").getTime(),
};

const mockedCandidate2: CandidateForJobList = {
  candidate_id: "2",
  matching: [
    {
      job_title: "Software Engineer",
      matching_score: 88.0,
    },
    {
      job_title: "Data Scientist",
      matching_score: 53.0,
    },
  ],
  preferred_name: "Jane Moe",
  current_position: "Entry-Level Software Engineering Intern",
  about_me:
    "I am a highly motivated entry-level software engineering student from an underprivileged background. I'm committed to learning and problem-solving and have experience in developing web applications using Python, JavaScript, and SQL. I'm also proficient in using AWS and Docker.",
  hard_skills: ["Python", "JavaScript", "SQL"],
  soft_skills: ["Communication", "Problem-Solving", "Teamwork", "Adaptability"],
  start_on: new Date("2024-01-01").getTime(),
};

const mockedCandidate3: CandidateForJobList = {
  candidate_id: "3",
  matching: [
    {
      job_title: "Software Engineer",
      matching_score: 94.0,
    },
  ],
  preferred_name: "Alice Smith",
  current_position: "Entry-Level Software Engineering Student",
  about_me:
    "I am an entry-level software engineering student from an underprivileged environment with a strong interest in machine learning and artificial intelligence. I'm passionate about developing and maintaining web applications using Python, JavaScript, and SQL. I'm also proficient in using Git and GitHub.",
  hard_skills: ["Python", "JavaScript", "SQL"],
  soft_skills: ["Communication", "Problem-Solving", "Teamwork", "Adaptability"],
  start_on: new Date("2024-05-01").getTime(),
};

const mockedCandidate4: CandidateForJobList = {
  candidate_id: "4",
  matching: [
    {
      job_title: "Software Engineer",
      matching_score: 69.0,
    },
  ],
  preferred_name: "Bob Jones",
  current_position: "Entry-Level Software Engineering Intern",
  about_me:
    "I am a highly motivated entry-level software engineering student with a strong interest in web development. I have experience in developing and maintaining web applications using Python, JavaScript, and HTML/CSS. I'm also proficient in using AWS and Docker.",
  hard_skills: ["Python", "JavaScript", "HTML/CSS"],
  soft_skills: ["Communication", "Problem-Solving", "Teamwork", "Adaptability"],
  start_on: new Date("2024-06-01").getTime(),
};

function getListOfCandidates(): CandidateForJobList[] {
  return [
    mockedCandidate,
    mockedCandidate2,
    mockedCandidate3,
    mockedCandidate4,
  ];
}

export default getListOfCandidates;
