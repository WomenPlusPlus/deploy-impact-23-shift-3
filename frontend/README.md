# Shift_Enter Next.js Frontend

# Next.js Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with Material UI installed.

To learn more:[Next.js documentation](https://nextjs.org/docs) - learn about Next.js features and API.
[Customizing Material UI](https://mui.com/material-ui/customization/how-to-customize/) - approaches to customizing Material UI.

## How to Use

Before you begin, make sure you have Node.js installed. You can download it from [Node.js server](https://nodejs.org/en)

Install the necessary project dependencies. You can do this by running the following command:
```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing
For testing we use Cypress test runner.

To run tests in a web browser:
```bash
 npx cypress open
```
To run tests in the console for automated testing: 
```bash
npx cypress run
```
To add test visit: frontend/cypress

For more information: [Cypress doc](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress)

Note: The app has not undergone comprehensive testing due to time constraints and our limited experience. However, we intend to follow Test-Driven Development (TDD) principles in future app development.

## Deployment - technical information
The app has been successfully deployed and can be accessed at the following URL: [Shift+Enter](https://nextjsapp-iwghenktca-ew.a.run.app/)

For deployment we used [Google cloud platform](https://console.cloud.google.com/welcome?project=enter-400508)

To deploy the app, you need to have the Google Cloud Console installed.

After installation, follow these steps to build and deploy the app:

1. Navigate to the required directory.

2. Build the app:
```bash
npm run gcbuild 
```

3. Deploy the app:
```bash
npm run gcdeploy
```

## Implemented flows

For testing purposes, you can use the following user accounts with different roles:

**USER 1**

- Email: `company@company.com`
- Password: `Company123.123`
- Role: `company user`

**USER 2**

- Email: `candidate@candidate.com`
- Password: `Candidate123.123`
- Role: `candidate`

**USER 3**

- Email: `association@association.com`
- Password: `Association123.123`
- Role: `association user`

### Company User Flow
This is the primary flow implemented within our application, providing company users with a seamless experience to navigate and interact with various features. Below, we outline the steps involved in the Company User Flow. You can also view a video demonstration of this flow, created from our Figma mockups, at [link to video].

**Note:** All data in this flow is downloaded from the testing database where the testing datasets have been prepared.

### Flow Steps

### 1. User Log In
Company users log in to their accounts, providing authentication.

### 2. List of Posted Jobs
Upon successful login, users are redirected to the list of jobs posted by the company.

### 3. Preview One Job
From the list of posted jobs, users have the option to preview details of a specific job.

### 4. List of Matched Candidates
Users can also access a list of candidates matched to the selected job.

### 5. List of Balanced Matched Candidates
Or access a list of candidates generated by the balanced algorithm.
This feature is currently not implemented in the application, but it serves an educational purpose. This feature is designed to provide users with insights into the concept of balanced matching.
Balanced matching is a technique aimed at reducing bias in candidate selection. It ensures that the selection process is fair and equitable, promoting diversity and inclusivity in the workplace.

### 6. Filter Candidates
Within the list of matched candidates, users have the ability to apply filters to refine the displayed candidates.

### 7. List of All Candidates Matched
Users can access a comprehensive list of all candidates matched to all posted jobs by the company.

### 8. Preview Candidate Profile
Within the list of candidates, users can preview the profile of a specific candidate.

### 9. Un-blur Hidden Data
Users have the option to un-blur hidden data within the candidate profiles.

### 10. Preview CV
Users can view the candidate's curriculum vitae (CV) directly from the profile.

### 11. Add Comment
Users can add comments related to a candidate's profile or qualifications.

### 12. Contact the Candidate
While the email functionality is not active, users have the option to initiate contact with a candidate.

Please note that this documentation outlines the sequential steps and capabilities within the Company User Flow. 
It allows company users to efficiently manage their posted jobs and interact with matched candidates in a user-friendly manner.

### Candidate User Flow

This flow outlines the user journey for candidates within our application. Candidates have specific actions and interactions designed to enhance their experience.
For a visual demonstration of this flow based on our Figma mockups, you can watch a video [here](link to video).

### Flow Steps

### 1. Candidate Log In
Candidates start by logging into the application, providing their authentication details.

### 2. Profile Page
Upon successful login, candidates are directed to their profile page. Here, they have several options:

- Edit Profile:
Candidates can edit and update their profile information to keep it current.

- Preview Profile:
Candidates can view their own profile as it appears to others.

### 3. Job Listings
   Candidates can navigate to the "Jobs" section, where they can view job listings posted by various companies. Please note that this feature showcases dummy data for preview purposes and does not reflect real job listings from the database.

### 4. Role-Based Redirection
   In case a candidate attempts to access a part of the app that is not permitted for their role (e.g., company or association functionalities), the system will automatically redirect them to a warning page, notifying them of their unauthorized access.

This flow ensures that candidates can manage their profiles, explore job opportunities, and adhere to role-based restrictions for a secure and efficient user experience.

