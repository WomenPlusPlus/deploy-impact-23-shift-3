FROM python:3.11.6-slim as base

WORKDIR /app

ARG UID=10001

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

RUN apt-get update && apt-get install
RUN apt-get -y install libpq-dev gcc

COPY requirements.txt requirements.txt
RUN  --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt

# Copy the source code into the container.
COPY . .

# Collect Django static files
RUN python manage.py collectstatic --noinput
RUN chmod -R 777 /app

# Switch to the non-privileged user to run the application.
USER appuser

# Expose the port that the application listens on.
EXPOSE 8000

CMD ["gunicorn", "-c", "gunicorn.conf.py", "shift_3_womenpp.wsgi:application"]