import json
import os
import logging

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
            if not "error" in decoded_token.keys():
                request.META["Authorization"] = decoded_token

        response = self.get_response(request)

        return response
