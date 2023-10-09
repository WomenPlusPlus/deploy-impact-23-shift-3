import requests, json, os
from dotenv import load_dotenv
from django.http import Http404
from rest_framework import status
import jwt
from api.auth_models import ResfreshToken, AuthUsers

load_dotenv()

SUPABASE_AUTH_URL = os.environ["SUPABASE_AUTH_URL"]
SUPABASE_PUBLIC_APIKEY = os.environ["SUPABAE_PUBLIC_APIKEY"]
JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]


def gotrue_auth_request(request: requests) -> dict:
    request_url = SUPABASE_AUTH_URL

    endpoint = request.path.split("/")[-2]

    if endpoint == "login":
        request_url += "token?grant_type=password"
    elif endpoint in ["verify", "recover", "logout", "signup"]:
        request_url += endpoint
    else:
        raise Http404

    # Common for all Requests
    payload = request.data

    headers_list = {
        "apikey": SUPABASE_PUBLIC_APIKEY,
        "Content-Type": "application/json",
    }

    if "Authorization" in request.headers.keys():
        headers_list["Authorization"] = request.headers["Authorization"]

    # Handle vrify (signup) requests
    if endpoint == "signup":
        response_verification = handle_signup_endpoint(request, payload)

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


def handle_signup_endpoint(request: requests, payload: json) -> json:
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


def decode_access_token(token: str) -> json:
    token = token.split("bearer ")[-1]

    try:
        decoded_jwt = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=["HS256"],
            audience=["authenticated", "service_role"],
        )
    except jwt.exceptions.ExpiredSignatureError as err:
        token = refresh_expired_token(token)
    except Exception as error:
        return error


# Return JSON decoded token


class RefreshTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # # the view (and later middleware) are called.

        if "Authorization" in request.headers:
            decoded_token = decode_access_token(request.headers["Authorization"])
        else:
            print("No access token")

        response = self.get_response(request)

        # response["role"] = role

        # Code to be executed for each request/response after
        # the view is called.

        return response


def refresh_expired_token(token: str) -> json:
    """Refreshes the access token if it has expired

    Should only be called if the token signature is already verified.

    Args:
        token (str): the expired and but valid JWT token
    """
    decoded_jwt = jwt.decode(
        token,
        algorithms=["HS256"],
        verify_signature=False,
    )

    access_token = decoded_jwt.session_id
    try:
        refresh_token = ResfreshToken.objects.get(
            session_id=decode_access_token.session_id
        ).refresh_token

    except ResfreshToken.DoesNotExist:
        refresh_token = {
            "error_description": "Token does not have a valid refresh token.",
            "status_code": status.HTTP_401_UNAUTHORIZED,
        }

    # If suceeded, return json with new token and info

    # If failerd, return JSON with failed message
    pass
