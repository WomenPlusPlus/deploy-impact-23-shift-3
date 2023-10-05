# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

FROM alpine:3.18.4 as base

# Prevents Python from writing pyc files.
ENV PYTHONDONTWRITEBYTECODE=1

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Create a non-privileged user that the app will run under.
# See https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

RUN apk update
# RUN apk add nginx
RUN apk add python3 py3-pip py3-psycopg2

COPY docker_requirements.txt docker_requirements.txt
RUN  --mount=type=cache,target=/root/.cache/pip pip3 install -r docker_requirements.txt

# Copy the source code into the container.
COPY . .

# Switch to the non-privileged user to run the application.
# USER appuser

# Expose the port that the application listens on.
EXPOSE 8000

RUN python manage.py collectstatic --noinput
CMD ["gunicorn", "-c", "gunicorn.conf.py", "shift_3_womenpp.wsgi:application"]