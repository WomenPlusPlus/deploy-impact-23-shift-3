describe("JobList Component", () => {
  it("should redirect me into login if I want approach the app without auth", () => {
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
    cy.visit("http://localhost:3000/company/jobs");
    cy.url().should("include", "/login");
  });
});
