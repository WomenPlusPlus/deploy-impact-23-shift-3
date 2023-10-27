import json
import logging
import os

import requests
from django.http import Http404

from api import auth_token
from rest_framework import status
from api import authentication_services

from api.models import SupabaseIdToUserIds

from api.models import (
    AvailableCompanyDomains,
)

from api.auth_models import AuthUsers


logging.basicConfig(
    level=int(os.environ["LOGGING_LEVEL"]), filename="logs/services.log"
)

logging.basicConfig(
    level=int(os.environ["LOGGING_LEVEL"]), filename="logs/services.log"
)

SUPABASE_AUTH_URL = os.environ["SUPABASE_AUTH_URL"]
SUPABASE_PUBLIC_APIKEY = os.environ["SUPABAE_PUBLIC_APIKEY"]
SUPABASE_SERVICE_ROLE_APIKEY = os.environ["SUPABASE_SERVICE_ROLE_APIKEY"]


def gotrue_auth_request(request: requests) -> dict:
    """
    Sends an authentication request to the Supabase server.

    Args:
        request (requests): A request object containing the data to be sent.

    Returns:
        dict: A dictionary containing the response payload and status code.
    """
    request_url = SUPABASE_AUTH_URL

    # Common for all Requests
    request_payload = request.data

    endpoint = request.path.split("/")[-2]

    headers_list = {
        "apikey": SUPABASE_PUBLIC_APIKEY,
        "Content-Type": "application/json",
    }

    if "Authorization" in request.headers.keys():
        headers_list["Authorization"] = request.headers["Authorization"]

    # Verify typpe of request
    if endpoint == "login":
        if "password" in request_payload.keys():
            request_url += "token?grant_type=password"
        elif "refresh_token" in request_payload.keys():
            request_url += "token?grant_type=refresh_token"
        else:
            return {"error": "Invalid login details"}, status.HTTP_400_BAD_REQUEST

    elif endpoint in ["verify", "recover", "logout", "signup", "invite"]:
        request_url += endpoint
    else:
        raise Http404

    # Add service key to header, only service roles may send invites
    if endpoint == "invite":
        headers_list["Authorization"] = "bearer " + SUPABASE_SERVICE_ROLE_APIKEY

    # Add type to signup
    if endpoint == "verify":
        request_payload["type"] = "signup"

    # Send request
    response = requests.request(
        "POST",
        request_url,
        data=json.dumps(request_payload),
        headers=headers_list,
        # ToDo implement true certificate
        verify=False,
    )

    if response.text != "":
        response_payload = json.loads(response.text)
    else:
        response_payload = {}

    # Assign roles in case of invite
    return response_payload, response.status_code


def update_user_password(token: json, password: str) -> requests.Request:
    """
    Update user password.

    :param token: JSON Web Token (JWT) for authentication.
    :type token: json

    :param password: New password to be set.
    :type password: str

    :return: Response object containing the updated user information.
    :rtype: requests.Request
    """
    headers_list = {
        "apikey": SUPABASE_PUBLIC_APIKEY,
        "Authorization": "bearer " + token,
    }

    response = requests.request(
        "PUT",
        SUPABASE_AUTH_URL + "user",
        data=json.dumps({"password": password}),
        headers=headers_list,
        # ToDo implement true certificate
        verify=False,
    )

    return response


def authorize_invite(jwt: json) -> bool:
    """Receives a jwt token key, decodes it and checks if the user is authorized to invite members

    Args:
    jwt (json): encrypted JWT token

    Returns:
    bool: Returns true if the user might invite others
    """

    decoded_token = auth_token.authenticate_access_token(jwt)
    permitted_users = ["association", "admin", "service_role", "association_user"]
    if "user" in decoded_token.keys():
        if decoded_token["user"]["role"] in permitted_users:
            return True

    if "role" in decoded_token.keys():
        if decoded_token["role"] in permitted_users:
            return True

    return False


def apply_supabase_id_to_users_tables_and_apply_metadata(payload: json) -> None:
    """Apply the id from the schema auth.auth_users to the tables public

    Args:
    payload (json): payload from database signup

    Returns:
    None
    """

    role = payload["user"]["role"]

    user_model = authentication_services.get_user_type(role)

    supabase_user_id = payload["user"]["id"]

    user_id = user_model.objects.filter(
        supabase_authenticaiton_uuid=supabase_user_id
    ).values_list("pk", flat=True)[0]

    SupabaseIdToUserIds(
        supabase_authenticaiton_uuid=supabase_user_id, role=role, user_id=user_id
    ).save()

    auth_user = AuthUsers.objects.get(pk=supabase_user_id)
    metadata = auth_user.raw_user_meta_data
    metadata["id"] = user_id
    metadata["role"] = role
    auth_user.save(update_fields=["raw_user_meta_data"])


def create_user_in_respective_table(request_payload, response_payload) -> json:
    user_model = authentication_services.get_user_type(response_payload["user"]["role"])

    user_model.objects.create(
        first_name=request_payload["first_name"],
        last_name=request_payload["last_name"],
        email=request_payload["email"],
        supabase_authenticaiton_uuid=response_payload["user"]["id"],
        last_country_id=227,
    )


def register_company_domain(payload: json) -> json:
    if "email" not in payload.keys():
        return {
            "error": "Invalid request",
            "error detail": "This request requires an email",
            "status_code": status.HTTP_400_BAD_REQUEST,
        }

    domain_to_insert = payload["email"].split("@")[-1]

    retrieved_domains = AvailableCompanyDomains.objects.filter(domain=domain_to_insert)

    if not len(retrieved_domains):
        domain = AvailableCompanyDomains.objects.create(domain=domain_to_insert)

        return {"domain": domain_to_insert, "status_code": status.HTTP_201_CREATED}


def is_valid_company_domain(paylaod: json) -> json:
    domain = paylaod["email"].split("@")[-1]

    retrieved_domain = AvailableCompanyDomains.objects.filter(domain=domain)

    if retrieved_domain:
        return True

    return False
