describe("JobList Component", () => {
  before(() => {
    cy.intercept(
      "POST",
      "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/login/",
      {
        access_token:
          "eyJhbGciOiJIUzI1NiIsImtpZCI6ImdrdVlyMFVnYmF5MjVMRWQiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk4NTYxNTI0LCJpYXQiOjE2OTg0NzUxMjQsImlzcyI6Imh0dHBzOi8vaWN1eHprbG5teW9iZmpneHVkb2guc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjlmMmRiYzllLWRiZWQtNDkyYy04ODhlLTBkMTI3OTJmMTZhMyIsImVtYWlsIjoiY29tcGFueUBjb21wYW55LmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiaWQiOjEsInByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXSwidXNlcl90eXBlIjoiY29tcGFueV91c2VycyJ9LCJyb2xlIjoiY29tcGFueV91c2VyIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE2OTg0NzUxMjR9XSwic2Vzc2lvbl9pZCI6ImY2M2YxMjE3LWViMzgtNGZjMi04ZTk1LTMzNTkxYTI2NDJlOCJ9.cnVsGqLwUk9ME7tUHt7l9oG5LwcFV_FTMoVw_8IX-dA",
        token_type: "bearer",
        expires_in: 86400,
        expires_at: 1698561524,
        role: "company_user",
        last_sign_in_at: "2023-10-28T06:38:44.972090684Z",
        id: 1,
        refresh_token: "HvtEzH_onnvbFLkH5gsjng",
        first_name: "Robert",
        last_name: "Art",
        preferred_name: "Roland",
      },
    ).as("login");
  });
  it("should redirect me into login if I want approach the app without auth", () => {
    cy.visit("http://localhost:3000/company/jobs");
    cy.url().should("include", "/login");
  });
  it("should redirect me into company's job list after log in as a company user", () => {
    cy.intercept("");
    cy.visit("http://localhost:3000/login");
    cy.get("#email").type("company@company.com");
    cy.get("#password").type("Company123.123");
    cy.get("form").submit();
    cy.url().should("include", "/company/jobs");
    const jobPosts = [
      {
        job_id: "12345",
        hard_skills: ["JavaScript", "React", "Node.js"],
        soft_skills: ["Communication", "Problem Solving"],
        matches: "88.5",
        job_title: "Frontend Developer",
        location: "Geneva",
        industry: "Technology",
        raw_description: "This is a job description...",
        job_description: "Frontend developer needed for our team.",
        values: ["Innovation", "Teamwork"],
        website: "https://www.example.com",
        languages: ["English", "Spanish"],
        open: true,
        description_embedded: "Embedded description...",
        last_day_to_apply: "2023-12-31",
        closed_at: 1640947200,
        created_at: 1640940000,
        job_type: "Full-time",
        work_model: "On-site",
        matched_candidates: 5,
      },
    ];
    cy.intercept(
      "GET",
      "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/company_jobs/",
      {
        body: jobPosts,
      },
    ).as("jobPosts");
  });
});
