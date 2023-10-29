![Shift Enter](https://raw.githubusercontent.com/patw47/deploy-impact-23-shift-3/main/assets/Welcome%20to%20Shift%20%2B%20Enter.gif)

# SHIFT initative


SHIFT is a pioneering initiative in collaboration between women++ and Powercoders. Recognizing the challenges that underrepresented groups face in the tech industry, this project aims to bridge the gap between these talented individuals and the companies eager to employ them.

Access to the app : [Start](https://nextjsapp-iwghenktca-ew.a.run.app/login)

## Table of Contents

- [Problem Statement](#problem-statement)
- [Opportunity](#opportunity)
- [Combat Biais](#combat-biais)
  - [Data Science Solution](#data-science-solution)
  - [Frontend Solution](#frontend-solution)
- [Contributors](#contributors)
- [Tech Stack](#tech-stack)
- [Files Structure](#files-structure)
- [Frontend](#frontend)
  - [How to Use](#how-to-use)
  - [Testing](#testing)
  - [Deployment](#deployement)
  - [UI/UX](#ui/ux)
- [Backend](#backend-api)
  - [Getting Started](#getting-started)
  - [Setup the CI/CD](#setup-the-CI/CD)
  - [Files and notable features](#files-and-notable-features)
  - [Data Science](#data-science)
- [Roadmap](#roadmap)
- [Resources](#resources)
- [License](#license)
- [Acknowledgments](#acknowledgments)

# Problem Statement 

Despite the rising numbers of qualified individuals from underrepresented backgrounds in tech, there remains a disparity in their representation in internships and entry-level positions. These individuals often struggle to find suitable employers, and conversely, many tech companies find it challenging to locate such skilled talent

# Opportunity 

By joining forces with non-profit organizations championing the cause of diversifying the tech talent pool, SHIFT offers an unique opportunity. It aims to streamline the recruitment process for both companies and prospective employees by creating an exclusive platform tailored for this niche.

# Combat Biais

## Data Science Solution

Our Matching algorithm combines different methods (Explained in details in the [backend](#backend-api) section).

The concept is based on extracting the soft and hard skills entered by the candidate, which are then directly compared with the soft and hard skills requested in the job offer. 
We then perform a semantic comparison of the free text of the candidate's profile (Values, experience) with the text of the job advert.
Finally, we average the scores obtained when comparing the texts with the following weightings: 
- 20% soft skills
- 20% hard skills
- 60% free text

Secondly, in an effort to promote under-represented groups, we have chosen to offer the possibility to include in the top 10 results people who describe themselves as female or gender-neutral, as well as people of immigrant background. This is what we called "Balanced Matching".

The results are displayed in descending order, from the most important match (displayed as a percentage) to the least important.

## Frontend Solution

We have chosen to blur out information that could lead to bias, such as the profile photo or place of study, so that companies can appreciate the skills and values that are important to them when recruiting. 

However, we wanted to give companies the freedom to 'unblur' this information if they wished. In fact, we didn't want to block all access to sensitive information, because we assume that the platform has an educational role above all, and its role is simply to enable companies to become aware of any biases they might have, in a fun way. 

We have therefore designed informative tooltips for these functions to challenge users and make them think about their actions on the platform.

# Contributors 

- Martina Babinska, Frontend - [Github](https://github.com/Corrigan14) - [Linkedin](https://www.linkedin.com/in/martina-babinska-32369a140/)
- Patricia Wintrebert, Data Science - [Github](https://github.com/patw47) - [Linkedin](https://www.linkedin.com/in/patriciawintrebert/)
- Janice Shaw, Frontend - [Github](https://github.com/JaniceShaw) - [Linkedin](https://www.linkedin.com/in/janice-shaw/)  
- Tanya Golubev, Data Science - [Github](https://github.com/golubevtanya) - [Linkedin](https://www.linkedin.com/in/golubevtanya/)
- Diana Campos - UI/UX - [Linkedin](https://www.linkedin.com/in/dikmpos105/)
- Guilherme Kruger, Backend - [Github](https://github.com/krugergui) 
- Paras Shah, Project Management [Linkedin](https://www.linkedin.com/in/pshah78/)

For further development please contact XX

# Tech Stack 


![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)


 # Files Structure 

 To do

 # Frontend 

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

### Deployment - technical information
For deployment we used [Google cloud platform](https://console.cloud.google.com/welcome?project=enter-400508)

To deploy the app, you need to have the Google Cloud Console installed.

After installation, follow these steps to build and deploy the app:

1. Navigate to the required directory.

2. Build the app:
```bash
gcloud builds submit --tag gcr.io/enter-400508/nextjsapp --project enter-400508 .
```

3. Deploy the app:
```bash
gcloud run deploy nextjsapp --image gcr.io/enter-400508/nextjsapp  --project enter-400508
```
## UI/UX

### Overview
This Figma Prototype is designed to showcase the flows that have been designed. You will see the high fidelity mockups, the primary functions of the flow, and future flows for implementation.

### How to Use
1. **Access the Prototype**: 
You can interact with the prototype at the following link: [Figma](https://www.figma.com/proto/qzRo0T1FIRIp2FkBZtXKey/SHIFT-UI?page-id=0%3A1&type=design&node-id=65-514&viewport=817%2C-4082%2C0.16&t=vVdNABqel4mhStHB-1&scaling=min-zoom&starting-point-node-id=65%3A514&show-proto-sidebar=1&mode=design)
   
2. **Navigate Through the Prototype**: 
You have a left bar and a top bar. 
1.	The left bar will help you to move through each designed flow. They are organized by:
- A. Login
- B. Company
- C. Candidate
- D. Association
2.	The top bar gives you the option of how to preview the screen. Please go to Options > Fit width.
3.	To go to the next flow, select the next title in the left bar.
4.	If you want to go back again and restart the whole flow, press “R”.

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
dianaalkampos@gmail.com

### Licensing
There is no restriction to interact with the prototype, all tho this is an excuse example for the Deploy(impact) 2023 program.

# Backend API 

## Tech stack
- [Python](https://www.python.org/)
  - [Django Rest Framework](https://www.django-rest-framework.org/)
  - [spaCy](https://spacy.io/)
  - [SkillNer](https://skillner.vercel.app/)
  - [Sklearn](https://scikit-learn.org/stable/)
  - [pyTorch](https://pytorch.org/)
  - [TensorFlow](https://www.tensorflow.org/)
  - [Gunicorn](https://gunicorn.org/)
- [PostgreSQL](https://www.postgresql.org/)
  - [Supabase](https://supabase.com/)
    - [GoTrue auth](https://github.com/netlify/gotrue)
- [Nginx](https://www.nginx.com/)

## Getting Started

### To install dependencies

```python
python -m venv venv
. venv/bin/activate
python -m pip install -r requirements.txt
```

### Environment variables

Copy and reanme `.env.template` to `.env` and replace the variables with your values.

### Create the DB

```python
python manage.py makemigrations
python manage.py migrate
```

### Start a development server

```python
python manage.py runserver
```

Go to `localhost:8000` and see the documentation.

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
  - Contains the algorithm that finds the most suitable jobs for each candidate, and vice versa
- `skill_extractor.py`
  - Automatically extracts skills from free text, both about me and experience, then order them in hard and soft skills
- `api/tokenization_n_embedding.py`
  - Tokenizes the infortion at registration for quicker mathcing at runtime

### Features

Besides the aforementioned features, the following are all wokring at the time of closign the Github repository of the project:

- Invite based signup, retricted to the email, only available to certain users (association), and definition of user to be registered
- Restriction at signup to company domains for company users
- Login / Logout / Password recovery
- JWT decoding/authentication
- RBAC - Role based access control
- DB creation
- CRUD (Create, read, update, delete) of all the models
- Crud of Files and Photos to GCP
- Api documentation with all the endpoints - partially commented
- Dockerization
- Deployment - Google Cloud Run
- CI/CD - Github actions to Google Cloud Run
- Production ready gateway - Gunicorn
- Production ready load balancer - nginx

## Data Science

Our matching algorithm is based on a careful evaluation of candidates, jobs and required skills. Here's how it works:

Skills Extraction: We extract the "soft" and "hard" skills of candidates, as well as those required in job descriptions.
To do this, we use the [Skillner](https://skillner.vercel.app/) NLP module

Language Extractions : We use the [languages ISO list](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

Free text processing: The free text part of the applications is transformed using the powerful HuggingFace library. We use a pre-trained NLP model ([Hugging Face Transformers](https://huggingface.co/)) to tokenize and vectorize these texts, enabling us to assess semantic similarity.

Similarity measurement: We use a similarity indicator called Cosine Similarity to compare vectors of skills and job descriptions. It is a metric used to measure how similar two vectors are in a multidimensional space. It is often used in natural language processing, information retrieval, and machine learning for tasks such as document similarity, text clustering, and recommendation systems.

Cosine similarity is particularly useful when dealing with high-dimensional data, like text documents, where the magnitude of the vectors can vary significantly. It measures the cosine of the angle between two vectors and ranges from -1 to 1:

If the cosine similarity is 1, it means the two vectors are identical in direction, i.e., they point in the same direction in the vector space.
If the cosine similarity is 0, it means the vectors are orthogonal (90 degrees apart), indicating no similarity.
If the cosine similarity is -1, it means the two vectors are diametrically opposed, i.e., they point in opposite directions.

### Data Processing Notebooks

This folder contains the code that was used for parsing the datasets with job descriptions and candidates' profiles.

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

Pitch : Presentation Pitch 


<div style="text-align:center;"><img src="https://raw.githubusercontent.com/patw47/deploy-impact-23-shift-3/main/assets/shift%20enter.png" alt="Shift Enter"></div>