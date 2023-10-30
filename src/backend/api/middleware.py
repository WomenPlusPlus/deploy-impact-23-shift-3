import json
import os
import logging
import jwt

from dotenv import load_dotenv

from api.auth_models import RefreshTokens
from api.auth_token import authenticate_access_token
from api.services import gotrue_auth_request
from rest_framework import status

load_dotenv()


JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]

logging.basicConfig(
    level=int(os.environ["LOGGING_LEVEL"]),
    handlers=[logging.FileHandler("logs/middleware.log"), logging.StreamHandler()],
)


class RefreshTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if "Authorization" in request.headers:
            decoded_token = authenticate_access_token(request.headers["Authorization"])
            logging.debug("Updated request token", decoded_token)
            if type(decoded_token) == "str":
                request.META["Authorization"] = "bearer " + decoded_token

        response = self.get_response(request)

        return response


def authenticate_access_token(token: str) -> json:
    """Authenticates the token using the JWT key

    Args:
        token (str): the JWT token

    Returns:
        json: returns a JSON with the token in case it is valid, otherwise returns a JSON with error
    """
    if token[0:6] in ["Bearer", "bearer"]:
        token = token[7:]

    try:
        token = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=["HS256"],
            audience=["authenticated", "service_role"],
        )
    except jwt.exceptions.ExpiredSignatureError as err:
        # If jwt.decode reaches ExpiredSignatureError means the signature is valid but has expired
        # return refresh_expired_token(token)
        return None
    except Exception as error:
        return error

    return token


# Deprecated, refresh token should be handled by the FE
def refresh_expired_token(token: str) -> json:
    """Refreshes the access token if it has expired

    Should only be called if the token signature is already verified.

    Args:
        token (str): the expired and but valid JWT token
    """
    decoded_jwt = jwt.decode(
        token, algorithms=["HS256"], options={"verify_signature": False}
    )

    access_token = decoded_jwt["session_id"]
    try:
        refresh_token = RefreshTokens.objects.get(
            session_id=access_token, revoked=False
        ).token

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
        )

        request_new_token = request_new_token.prepare()
        request_new_token.data = {"refresh_token": refresh_token}
        request_new_token.path = "https://127.0.0.1/api/login/"

        new_token, _ = gotrue_auth_request(request_new_token)
    except Exception as e:
        return {"error": "Failed refresh token request", "error_detail": e}

    return new_token
