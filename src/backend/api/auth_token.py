import json
import os

import jwt
import requests

from api.models import SupabaseIdToUserIds, Candidates, Companies, Associations
from api.auth_models import RefreshTokens
from api import services
from rest_framework import status

JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]


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
        decoded_token = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=["HS256"],
            audience=["authenticated"],
        )
    except jwt.exceptions.ExpiredSignatureError as err:
        # If jwt.decode reaches ExpiredSignatureError means the signature is valid but has expired
        # return refresh_expired_token(token)
        return None
    except Exception as error:
        raise "Invalid JWT signature"

    return decoded_token


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

        new_token, _ = services.gotrue_auth_request(request_new_token)
    except Exception as e:
        return {"error": "Failed refresh token request", "error_detail": e}

    return new_token


def format_token(token: json) -> json:
    """Receives a Supabase generated JSON with token and reformats to the apps default

    Args:
        token (json): The JSON returned from Supabases gotrue endpoints

    Returns:
        json: The formatted JSON
    """

    supabase_user_id = token["user"]["id"]

    user = SupabaseIdToUserIds.objects.filter(
        supabase_authenticaiton_uuid=supabase_user_id
    ).first()

    match token["user"]["role"]:
        case "candidate":
            user_profile = Candidates
        case "company_user":
            user_profile = Companies
        case "association_user":
            user_profile = Associations
        case "admin":
            raise Exception("Admin not yet implemented")

    if user:
        id = user.user_id
        user_profile = user_profile.objects.get(pk=id).__dict__
    else:
        id = "No id found in connection table, this is probably an old user."
        user_profile = {
            "first_name": "Generic First Name",
            "last_name": "Generic Last Name",
            "preferred_name": "Generic Preferred Name",
        }

    new_token = {
        "access_token": token["access_token"],
        "token_type": token["token_type"],
        "expires_in": token["expires_in"],
        "expires_at": token["expires_at"],
        "role": token["user"]["role"],
        "last_sign_in_at": token["user"]["last_sign_in_at"],
        "id": id,
        "refresh_token": token["refresh_token"],
        "first_name": user_profile["first_name"],
        "last_name": user_profile["last_name"],
        "preferred_name": user_profile["preferred_name"],
    }

    return new_token
