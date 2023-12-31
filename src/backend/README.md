# BACKEND API

## Techstack

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

## To install dependencies

```python
python -m venv venv
. venv/bin/activate
python -m pip install -r requirements.txt
```

## Environment variables

Copy and reanme `.env.template` to `.env` and replace the variables with your values.

## Create the DB

```python
python manage.py makemigrations
python manage.py migrate
```

## Start a development server

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

## Features

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
