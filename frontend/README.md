# Shift_Enter Next.js Frontend

# Next.js Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with Material UI installed.

To learn more:[Next.js documentation](https://nextjs.org/docs) - learn about Next.js features and API.
[Customizing Material UI](https://mui.com/material-ui/customization/how-to-customize/) - approaches to customizing Material UI.

## Project Description

[Include a brief description of your project here.]

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

## Deployment

The app has been successfully deployed and can be accessed at the following URL: [Shift+Enter](https://nextjsapp-iwghenktca-ew.a.run.app/)

For testing purposes, you can use the following user accounts with different roles:

**USER 1**

- Email: `company@company.com`
- Password: `Company123.123`
- Role: `company`

**USER 2**

- Email: `candidate@candidate.com`
- Password: `Candidate123.123`
- Role: `candidate`

**USER 3**

- Email: `association@association.com`
- Password: `Association123.123`
- Role: `association`

## Deployment - technical information
For deployment we used [Google cloud platform](https://console.cloud.google.com/welcome?project=enter-400508)

To deploy the app it is necessary to have cloud console installed. 

After the instalation it is necessary to build the app (navigate into required file) and run:
```bash
gcbuild
```

And deploy the app:
```bash
gcdeploy
```
