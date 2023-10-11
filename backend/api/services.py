import json
import logging
import os

import requests
from django.http import Http404
from dotenv import load_dotenv

from api.auth_models import AuthUsers
from rest_framework import status

load_dotenv()

logging.basicConfig(
    level=int(os.environ["LOGGING_LEVEL"]), filename="logs/services.log"
)

SUPABASE_AUTH_URL = os.environ["SUPABASE_AUTH_URL"]
SUPABASE_PUBLIC_APIKEY = os.environ["SUPABAE_PUBLIC_APIKEY"]
JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]


def gotrue_auth_request(request: requests) -> dict:
    request_url = SUPABASE_AUTH_URL

    # Common for all Requests
    logging.debug("request at gotrue", request)
    payload = request.data

    headers_list = {
        "apikey": SUPABASE_PUBLIC_APIKEY,
        "Content-Type": "application/json",
    }

    if "Authorization" in request.headers.keys():
        headers_list["Authorization"] = request.headers["Authorization"]

    endpoint = request.path.split("/")[-2]

    # Verify typpe of request
    if endpoint == "login":
        if "password" in payload.keys():
            request_url += "token?grant_type=password"
        elif "refresh_token" in payload.keys():
            request_url += "token?grant_type=refresh_token"
        else:
            return {"error": "Invalid login details"}, status.HTTP_400_BAD_REQUEST

    elif endpoint in ["verify", "recover", "logout", "signup"]:
        request_url += endpoint

    else:
        raise Http404

    # Validate the signup request
    if endpoint == "signup":
        response_verification = validate_signup(request, payload)

        if "error" in response_verification:
            return response_verification, status.HTTP_401_UNAUTHORIZED

    # Send request
    response = requests.request(
        "POST",
        request_url,
        data=json.dumps(payload),
        headers=headers_list,
        # ToDo implement true certificate
        verify=False,
    )

    if response.text != "":
        response_payload = json.loads(response.text)

        if "refresh_token" in response_payload.keys():
            del response_payload["refresh_token"]
    else:
        response_payload = {}

    return response_payload, response.status_code


def validate_signup(request: requests, payload: json) -> json:
    if "token" in payload.keys():
        try:
            UserSigningUp = AuthUsers.objects.get(confirmation_token=payload["token"])
        except AuthUsers.DoesNotExist:
            return {
                "error": "invalid_token",
                "error_detail": "Can't signup, the provided token is not associated with any account.",
            }

        if UserSigningUp.email != payload["email"]:
            return {
                "error": "invalid_token",
                "error_detail": "Can't signup, the provided email does not match the email associated with this token.",
            }

        # If sucessful
        return {"token": UserSigningUp.confirmation_token}
    else:
        return {
            "error": "invalid_token",
            "error_detail": "Can't signup, no token present in body",
        }
