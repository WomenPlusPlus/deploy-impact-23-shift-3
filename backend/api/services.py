import requests, json, os
from dotenv import load_dotenv
from django.http import Http404
from rest_framework import status
import jwt

load_dotenv()

SUPABASE_AUTH_URL = os.environ["SUPABASE_AUTH_URL"]
SUPABASE_PUBLIC_APIKEY = os.environ["SUPABAE_PUBLIC_APIKEY"]
JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]


def gotrue_auth_request(request: requests) -> dict:
    request_url = SUPABASE_AUTH_URL

    endpoint = request.path.split("/")[-2]

    if endpoint == "login":
        request_url += "token?grant_type=password"
    elif endpoint in ["signup", "recover", "logout"]:
        request_url += endpoint
    else:
        raise Http404

    headersList = {
        "apikey": SUPABASE_PUBLIC_APIKEY,
        "Content-Type": "application/json",
    }

    if "Authorization" in request.headers.keys():
        headersList["Authorization"] = request.headers["Authorization"]

    payload = json.dumps(request.data)

    response = requests.request(
        "POST", request_url, data=payload, headers=headersList, verify=False
    )

    if response.text != "":
        response_payload = json.loads(response.text)

        if "refresh_token" in response_payload.keys():
            del response_payload["refresh_token"]
    else:
        response_payload = ""

    status_code = response.status_code

    return response_payload, status_code


class RefreshTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # print(request.headers.keys())
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response
