import json
import os
import logging

import jwt
import requests
from dotenv import load_dotenv

from api.auth_models import RefreshTokens
from api.services import gotrue_auth_request
from rest_framework import status

load_dotenv()

JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]

logging.basicConfig(
    level=int(os.environ["LOGGING_LEVEL"]), filename="logs/middleware.log"
)


class RefreshTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.
        print(
            "Setting up",
        )

    def __call__(self, request):
        # Code to be executed for each request before
        # # the view (and later middleware) are called.
        logging.debug("Runnning middleware")
        if "Authorization" in request.headers:
            print(
                "Attempt to decode",
            )
            decoded_token = decode_access_token(request.headers["Authorization"])
            print("Middleware token before req2:", decoded_token)
        else:
            print("No access token")

        response = self.get_response(request)

        # response["role"] = role

        # Code to be executed for each request/response after
        # the view is called.

        return response


def decode_access_token(token: str) -> json:
    if token[0:6] in ["Bearer", "bearer"]:
        token = token[7:]

    try:
        decoded_jwt = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=["HS256"],
            audience=["authenticated", "service_role"],
        )
    except jwt.exceptions.ExpiredSignatureError as err:
        # If jwt.decode reaches ExpiredSignatureError means the signature is valid but has expired
        return refresh_expired_token(token)
    except Exception as error:
        return error

    return decoded_jwt


def refresh_expired_token(token: str) -> json:
    """Refreshes the access token if it has expired

    Should only be called if the token signature is already verified.

    Args:
        token (str): the expired and but valid JWT token
    """
    print("Decoding token")
    decoded_jwt = jwt.decode(
        token, algorithms=["HS256"], options={"verify_signature": False}
    )

    access_token = decoded_jwt["session_id"]
    try:
        refresh_token = RefreshTokens.objects.get(session_id=access_token).token
        print("refresh token", refresh_token)

    except RefreshTokens.DoesNotExist:
        refresh_token = {
            "error": "Not authorized",
            "error_description": "Bearer token does not have a valid refresh token.",
            "status_code": status.HTTP_401_UNAUTHORIZED,
        }

    try:
        request_new_token = requests.Request(
            "POST",
            "https://127.0.0.1/api/login/",
            params={"data": {"refresh_token": refresh_token}},
        ).prepare()

        new_token = gotrue_auth_request(request_new_token)
    except Exception as e:
        return {"error": "Failed refresh token request", "error_detail": e}

    print("got new token", new_token)
    return new_token
