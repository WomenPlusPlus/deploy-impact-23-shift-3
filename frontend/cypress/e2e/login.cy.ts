describe("Login page", () => {
  it("should have a form", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("form").should("exist");
    cy.get('input[id="email"]').should("exist");
    cy.get('input[id="password"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("should fill in login form and submit, redirect to the Candidate profile", () => {
    cy.intercept(
      "POST",
      "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/login/",
      {
        access_token:
          "eyJhbGciOiJIUzI1NiIsImtpZCI6ImdrdVlyMFVnYmF5MjVMRWQiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk3OTk0MjA4LCJpYXQiOjE2OTc5OTA2MDgsImlzcyI6Imh0dHBzOi8vaWN1eHprbG5teW9iZmpneHVkb2guc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImE2ZDA5ZjUzLWI1N2MtNGM5Mi1hN2I0LTlkY2M3ZmI4MDkzYyIsImVtYWlsIjoia295b3hvMjM4NUBkaXhpc2VyLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiY2FuZGlkYXRlIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE2OTc5OTA2MDh9XSwic2Vzc2lvbl9pZCI6IjRhZTNkMDgzLWQ2M2QtNDBmYy1iYzMwLWIwZjRmMzhhZTRmMCJ9.MFo9Wh_1fJ8FG2g8mFdpOjcCp8VNMKTnyv9B4PfNsu8",
        token_type: "bearer",
        expires_in: 3600,
        expires_at: 1697994208,
        role: "candidate",
        last_sign_in_at: "2023-10-22T16:03:28.984504574Z",
        id: 8,
        refresh_token: "mL7G5qKB7tNQSf_SbLGhCQ",
      },
    ).as("login");
    cy.intercept("");
    cy.visit("http://localhost:3000/login");
    cy.get("#email").type("candidate@candidate.com");
    cy.get("#password").type("Candidate123.123");
    cy.get("form").submit();
    cy.url().should("include", "/candidate/profile");
  });

  it("should display an error message for invalid credentials", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#email").type("invalid@example.com");
    cy.get("#password").type("invalidpassword");
    cy.get("form").submit();
    cy.get(".MuiAlert-message")
      .should("be.visible")
      .contains("Invalid login credentials");
  });
});
