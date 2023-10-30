![Shift Enter](https://raw.githubusercontent.com/patw47/deploy-impact-23-shift-3/main/assets/Welcome%20to%20Shift%20%2B%20Enter.gif)

# SHIFT initative

SHIFT is a pioneering collaboration between women++ and Powercoders. It addresses challenges faced by underrepresented groups in the tech industry. The project aims to connect these individuals with companies through a dedicated matching platform.

Access to the app : [Start](https://nextjsapp-iwghenktca-ew.a.run.app/login)

## Table of Contents
- [SHIFT initative](#shift-initative)
  - [Table of Contents](#table-of-contents)
- [Problem Statement](#problem-statement)
- [Opportunity](#opportunity)
- [What does SHIFT offer?](#what-does-SHIFT-offer?)
- [Tech Stack](#tech-stack)
- [Files Structure](#files-structure)
- [Frontend](#frontend)
  - [Implemented flows](#implemented-flows)
    - [Company User Flow](#company-user-flow)
    - [Flow Steps](#flow-steps)
    - [Candidate User Flow](#candidate-user-flow)
    - [Flow Steps](#flow-steps-1)
  - [Resources](#resources)
  - [How to Use](#how-to-use)
  - [Testing](#testing)
  - [Deployment](#deployment)
- [Backend API](#backend-api)
  - [Flowchart of the website](#flowchart-of-the-website)
  - [Tech stack](#tech-stack-1)
  - [Getting Started](#getting-started)
    - [To install dependencies](#to-install-dependencies)
    - [Environment variables](#environment-variables)
    - [Create the DB](#create-the-db)
    - [Start a development server](#start-a-development-server)
  - [Setup the CI/CD](#setup-the-cicd)
  - [Files and notable features](#files-and-notable-features)
    - [Features](#features)
- [UI/UX](#uiux)
  - [Overview](#overview)
  - [How to Use](#how-to-use-1)
  - [Prototype Structure](#prototype-structure)
  - [Key Features](#key-features)
  - [Contact Information](#contact-information)
  - [Licensing](#licensing)
- [Data Science Solution](#data-science-solution)
  - [Details of Data Science Solution Impelmentation](#details-of-data-science-solution-impelmentation)
  - [Data Processing Notebooks](#data-processing-notebooks)
- [Roadmap](#roadmap)
- [Resources](#resources-1)
- [Contributors](#contributors)

# Problem Statement

Despite the rising numbers of qualified individuals from underrepresented backgrounds in tech, there remains a disparity in their representation in internships and entry-level positions. These individuals often struggle to find suitable employers, and conversely, many tech companies find it challenging to locate such skilled talent

# Opportunity

By joining forces with non-profit organizations championing the cause of diversifying the tech talent pool, SHIFT offers an unique opportunity. It aims to streamline the recruitment process for both companies and prospective employees by creating an exclusive platform tailored for this niche.

# What does SHIFT offer?

* __exclusivity__: only companies seeking for improving diversity and inclusiont and only candidates that succsesfully complete one of hands-on initiatives are invited to join the platform. The invitation is handled by assosiatives from NGO organisations. 
* __unbiased screening__: the first impression of candidates is focused solely on their skills and projects, the information that can cause unconsious bias is blurred and additional actiona is required to unblurr it.
* __awareness__: small pop-up hints on bias prone actions while navigating through the platform.
* __active balancing__: balance the list pf top matching candidates by senstetive attributes (gender, age, correspondence to a minority).
* __support in improvement of candidates' profile__: suggestions on adding required skilss to improve matching score.
* __a learning journey__: multiple placeholders to rate features and leave a feedback from all the users of the platform. Only by learning from each other we can find the way to move forward fair and inbaised talant acquisition. 

# Tech Stack

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-%23FFB620.svg?style=for-the-badge&logo=cypress&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

# Files Structure

    .
    ├── .github/workflows       
    ├── frontend                
    ├── src
    │   ├── __init__.py
    │   ├── backend
    │   └── notebooks                  
    ├── test
    │   ├── __init__.py
    │   └── test_embedding_similarity.py                         
    ├── tools                       
    ├── LICENSE                      
    ├── Shift_enter_.drawio.png      
    ├── requirements_git_actions.txt
    └── README.md

Frontend and backend were developed and containerized independenlty, they contain internal folder tree with tjeir own tests. 

# Frontend

Our project's frontend has been developed using Next.js, a powerful and versatile framework for building web applications. Material UI has been integrated to enhance the user interface and provide a seamless and visually appealing experience.

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

This is the primary flow implemented within our application, providing company users with a seamless experience to navigate and interact with various features. Below, we outline the steps involved in the Company User Flow. You can also view a video demonstration of this flow, created from our Figma mockups. You can watch a video [here](https://drive.google.com/drive/folders/1DOGbKKDYtFtxAk5BsUkXlfEgj-e9XOmZ).

**Note:** All data in this flow is downloaded from the testing database where the testing datasets have been prepared.

### Flow Steps

**1. User Log In:**
Company users log in to their accounts, providing authentication.

**2. List of Posted Jobs:**
Upon successful login, users are redirected to the list of jobs posted by the company.

**3. Preview One Job:**
From the list of posted jobs, users have the option to preview details of a specific job.

**4. List of Matched Candidates:**
Users can also access a list of candidates matched to the selected job.

**5. List of Balanced Matched Candidates:**
Or access a list of candidates generated by the balanced algorithm.
This feature is currently not implemented in the application, but it serves an educational purpose. This feature is designed to provide users with insights into the concept of balanced matching.
Balanced matching is a technique aimed at reducing bias in candidate selection. It ensures that the selection process is fair and equitable, promoting diversity and inclusivity in the workplace.

**6. Filter Candidates:**
Within the list of matched candidates, users have the ability to apply filters to refine the displayed candidates.

**7. List of All Candidates Matched:**
Users can access a comprehensive list of all candidates matched to all posted jobs by the company.

**8. Preview Candidate Profile:**
Within the list of candidates, users can preview the profile of a specific candidate.
We have chosen to blur out information that could lead to bias, such as the profile photo or place of study, so that companies can appreciate the skills and values that are important to them when recruiting.
However, we wanted to give companies the freedom to 'unblur' this information if they wished. In fact, we didn't want to block all access to sensitive information, because we assume that the platform has an educational role above all, and its role is simply to enable companies to become aware of any biases they might have, in a fun way.
We have therefore designed informative tooltips for these functions to challenge users and make them think about their actions on the platform.

**9. Un-blur Hidden Data:**
Users have the option to un-blur hidden data within the candidate profiles.

**10. Add Comment:**
Users can add comments related to a candidate's profile or qualifications.

**11. Contact the Candidate:**
While the email functionality is not active, users have the option to initiate contact with a candidate.

Please note that this documentation outlines the sequential steps and capabilities within the Company User Flow.
It allows company users to efficiently manage their posted jobs and interact with matched candidates in a user-friendly manner.

### Candidate User Flow

This flow outlines the user journey for candidates within our application. Candidates have specific actions and interactions designed to enhance their experience.
For a visual demonstration of this flow based on our Figma mockups, you can watch a video [here](https://drive.google.com/drive/folders/1DOGbKKDYtFtxAk5BsUkXlfEgj-e9XOmZ).

### Flow Steps

**1. Candidate Log In:**
Candidates start by logging into the application, providing their authentication details.

**2. Profile Page:**
Upon successful login, candidates are directed to their profile page. Here, they have several options:

- Edit Profile:
  Candidates can edit and update their profile information to keep it current.

- Preview Profile:
  Candidates can view their own profile as it appears to others.

**3. Job Listings:**
Candidates can navigate to the "Jobs" section, where they can view job listings posted by various companies. Please note that this feature showcases dummy data for preview purposes and does not reflect real job listings from the database.

**4. Role-Based Redirection:**
In case a candidate attempts to access a part of the app that is not permitted for their role (e.g., company or association functionalities), the system will automatically redirect them to a warning page, notifying them of their unauthorized access.

This flow ensures that candidates can manage their profiles, explore job opportunities, and adhere to role-based restrictions for a secure and efficient user experience.

## Resources

- [Next.js Documentation](https://nextjs.org/docs):  Next.js features and its API to get a comprehensive understanding of the framework.
- [Customizing Material UI](https://mui.com/material-ui/customization/how-to-customize/): Various approaches for customizing Material UI to align it with your project's specific needs.

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

# Backend API

See it working at: <https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api>

To see how the API can be commented see the following endpoints:

- [`/api/jobs/{job_id}/`](https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/#/jobs/jobs_retrieve)
- [`/api/login/`](https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/#/login/login_create)

## Flowchart of the website

![Alt text](Shift_enter_.drawio.png#center)

## Getting Started

### To install dependencies

```bash
python -m venv venv
. venv/bin/activate
python -m pip install -r requirements.txt
```

### Environment variables

Copy and rename `.env.template` to `.env` and replace the variables with your values.

### Create the DB

```bash
python manage.py makemigrations
python manage.py migrate
```

### Start a development server

```bash
python manage.py runserver
```

Go to `localhost:8000/api` and see the documentation.

## Setup the CI/CD

Create a Google cloud account, setup an user account and give permissions to Artifact Registry and Cloud Run.

Download the JSON key of the user, open the file, remove the new lines (can cause problems when loading from Github actions), and save to a Github repository secret as `GOOGLE_APPLICATION_CREDENTIALS`.

After setting up your `.env` encode it in base64 for compatibility:

> **On Windows run:**  
> openssl base64 -A -in .env -out .env-base64.txt

> **On Linux/MacOS run:**  
> base64 .env > .env-base64.txt

Open the generated .env-base64.txt, copy its content and paste to a Github secret as `ENV_FILE_BACKEND`.

To activate the deployment workflow the commit or pull request has to be made to `backend` and end with `-deploy`.

## Files and notable features

The api is all contained in the `backend/api` folder, while files outside it are configuration files.****

Notable files and features:

- `matching_algorithm.py`
  - Contains the algorithm that finds the most suitable jobs for each candidate, and vice versa.
- `skill_extractor.py`
  - Automatically extracts skills from free text, from about me and experience for candidates, as well as from description of jobs, then order them in hard and soft skills.
- `api/tokenization_n_embedding.py`
  - Pre-tokenizes the information at registration for quicker matching at runtime.

### Features

Besides the aforementioned features, the following are all working at the time of closing the Github repository of the project:

- Invite based signup, retricted to the email that was sent to
- Invites are only available to to association - which also define type of user to be registered
- Restriction at signup to company domains for company users
- Login / Logout / Password recovery
- JWT decoding/authentication
- RBAC - Role based access control
- DB creation
- CRUD (Create, read, update, delete) of all the models
- Crud of Files and Photos to GCP buckets
- Api documentation with all the endpoints - partially commented
- Dockerization
- Deployment - Google Cloud Run
- CI/CD - Github actions to Google Cloud Run
- Production ready gateway - Gunicorn

# UI/UX

### Overview

This Figma Prototype is designed to showcase the flows that have been designed. You will see the high fidelity mockups, the primary functions of the flow, and future flows for implementation.


### How to Use

1. **Access the Prototype**:
   
You can interact with the prototype at the following link: [Figma](https://www.figma.com/proto/qzRo0T1FIRIp2FkBZtXKey/SHIFT-UI?page-id=0%3A1&type=design&node-id=65-514&viewport=817%2C-4082%2C0.16&t=vVdNABqel4mhStHB-1&scaling=min-zoom&starting-point-node-id=65%3A514&show-proto-sidebar=1&mode=design)
   
3. **Navigate Through the Prototype**:
   
You have a left bar and a top bar. 
The left bar will help you to move through each designed flow. They are organized by:

- A. Login
- B. Company
- C. Candidate
- D. Association

2.1 The top bar gives you the option of how to preview the screen. Please go to Options > Fit width.

2.2 To go to the next flow, select the next title in the left bar.

2.3 If you want to go back again and restart the whole flow, press “R”.

3. **Feedback and Comments**:
- You must be logged in to Figma to comment. 
- By typing or pressing “C” you can comment on anything you want to highlight or give us feedback. 
- The comments will remain in the file unless you click "Resolve" in the right bar that appears after you add a comment.

3. **Feedback and Comments**:

- You must be logged into Figma to comment.
- By typing or pressing “C” you can comment anything you want to highlight or give us feedback.
- The comments will remain in the file unless you click "Resolve" in the right bar that appears after you add a comment.

### Prototype Structure

As it is listed in the left pane. The prototype is organized by the following flows:

- A. Login (general sign-in and log-in flow)
- B. Company - Candidate list
- B. Company - Setup Profile
- B. Company - Job post
- B. Company - Job list section
- B. Company - Candidate list
- C. Candidate - Setup profile
- C. Candidate - Job list
- D. Association - Invite candidates

### Key Features

Not every button or interaction is prototyped. Therefore, we have added some videos in the file to have the full explanation. By clicking on the screen, you can see hints highlighted in blue of what is clickable.

You can see here in the following link the recorded videos with each flow designed: [Videos](https://drive.google.com/drive/folders/1TGAIahEZZUoSioJJA6W8hqKnIHvJiBja?usp=drive_link)

### Contact Information

Diana Campos
<dianaalkampos@gmail.com>

### Licensing

There is no restriction to interact with the prototype, all tho this is an excuse example for the Deploy(impact) 2023 program.

# Data Science Solution

Our matching algorithm is based on a careful evaluation of candidates, jobs and required skills. 

The concept is based on extracting the soft and hard skills entered by the candidate, which are then directly compared with the soft and hard skills requested in the job offer.
We then perform a semantic comparison of the free text of the candidate's profile (Values, experience) with the text of the job advert.
Finally, we average the scores obtained when comparing the texts with the following weightings:

- 20% soft skills
- 20% hard skills
- 60% free text

Secondly, in an effort to promote under-represented groups, we have chosen to offer the possibility to include in the top 10 results people who describe themselves as female or gender-neutral, as well as people of immigrant background. This is what we called "Balanced Matching".

The results are displayed in descending order, from the most important match (displayed as a percentage) to the least important.

## Details of Data Science Solution Impelmentation

Skills Extraction: We extract the "soft" and "hard" skills of candidates, as well as those required in job descriptions.
To do this, we use the [Skillner](https://skillner.vercel.app/) NLP module.

Language Extractions : We use the [languages ISO list](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

Free text processing: The free text part of the applications is transformed using the powerful HuggingFace library. We use a pre-trained NLP model ([Hugging Face Transformers](https://huggingface.co/)) to tokenize and vectorize these texts, enabling us to assess semantic similarity.

Similarity measurement: We use a similarity indicator called Cosine Similarity to compare vectors of skills and job descriptions. It is a metric used to measure how similar two vectors are in a multidimensional space. It is often used in natural language processing, information retrieval, and machine learning for tasks such as document similarity, text clustering, and recommendation systems.

Cosine similarity is particularly useful when dealing with high-dimensional data, like text documents, where the magnitude of the vectors can vary significantly. It measures the cosine of the angle between two vectors and ranges from -1 to 1, where 1 is for fully identical entries and -1 for completely different ones.


### Data Processing Notebooks

The folder contains the code that was used for parsing the datasets with job descriptions and candidates' profiles.

One can download the dataset for candidates from [Kaggle](https://www.kaggle.com/datasets/heet9022/linkedin-dataset) and the dataset with jobs from [Kaggle](https://www.kaggle.com/datasets/andresionek/data-jobs-listings-glassdoor) and add the path to the datasets to the respective .yml files.

The following logical steps are used to clean the datasets:

- Filter tech-related, Swiss-based, entry-level items
- For job descriptions: use only descriptions written in English using [langid](https://github.com/saffsd/langid.py) package
- Extract soft and hard skills using [SkillNer](https://skillner.vercel.app/)
- Extract languages using [language ISO list](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
- Reorganize the columns (rename, drop ones not to be uploaded to the database, reset the index)

# Roadmap

After finishing prioritized Use Cases, here are the future developments that we would like to implement :

- More information for companies : Promote more inclusive recruitment, encourage diversity and provide tips to help companies move in this direction. Implement some documentation suggesting good recruitement practices for companies. For instance : Writing inclusive job offers with neutral language, offer flexibility at the workplace. avoid stressful recruiting process for neurodivergent individuals etc..

- Allow matching with more under-represented groups: We want to enable people with disabilities or neurodivergences to access job opportunities. The website will be adapted to comply with web accessibility standards such as WCAG (Web Content Accessibility Guidelines).

- Finetune the matching algorithm: With real data we will be able monitor and track performances of the model and continuously improve it to ensure its sustainability.

# Resources

Datasets used for populating the Database : [Kaggle Resume Dataset](https://www.kaggle.com/datasets/snehaanbhawal/resume-dataset), [Kaggle Linkedin Profile Dataset](https://www.kaggle.com/datasets/heet9022/linkedin-dataset?rvi=1), [Kaggle Glassdoor Jobs](https://www.kaggle.com/datasets/andresionek/data-jobs-listings-glassdoor)

Miro : [Team retrospective and brainstorming board](https://miro.com/app/board/uXjVMkJzhAg=/)

JIRA: [Sprint reports](https://deployimpact2023-shift.atlassian.net/jira/software/projects/SHIFT/boards/1/reports/burnup)
[Backlog](https://deployimpact2023-shift.atlassian.net/jira/software/projects/SHIFT/boards/1/backlog)
[Confluence Page](https://deployimpact2023-shift.atlassian.net/wiki/spaces/SD/overview?homepageId=131173)

<div style="text-align:center;"><img src="https://raw.githubusercontent.com/patw47/deploy-impact-23-shift-3/main/assets/shift%20enter.png" alt="Shift Enter"></div>

# Contributors

- Martina Babinska, Frontend - [Github](https://github.com/Corrigan14) - [Linkedin](https://www.linkedin.com/in/martina-babinska-32369a140/)
- Patricia Wintrebert, Data Science - [Github](https://github.com/patw47) - [Linkedin](https://www.linkedin.com/in/patriciawintrebert/)
- Janice Shaw, Frontend - [Github](https://github.com/JaniceShaw) - [Linkedin](https://www.linkedin.com/in/janice-shaw/)  
- Tanya Golubev, Data Science - [Github](https://github.com/golubevtanya) - [Linkedin](https://www.linkedin.com/in/golubevtanya/)
- Diana Campos - UI/UX - [Linkedin](https://www.linkedin.com/in/dikmpos105/)
- Guilherme Kruger, Backend - [Github](https://github.com/krugergui)
- Paras Shah, Project Management [Linkedin](https://www.linkedin.com/in/pshah78/)

For further development please contact [Tanya Golubev](https://www.linkedin.com/in/golubevtanya)