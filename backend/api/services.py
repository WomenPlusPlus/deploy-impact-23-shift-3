import requests, json, os
from dotenv import load_dotenv
from django.http import Http404

load_dotenv()

SUPABASE_AUTH_URL = os.environ["SUPABASE_AUTH_URL"]
SUPABASE_PUBLIC_APIKEY = os.environ["SUPABAE_PUBLIC_APIKEY"]


def login_signup_user(request: requests) -> dict:
    request.path

    request_url = SUPABASE_AUTH_URL

    if "login" in request.path:
        request_url += "token?grant_type=password"
    elif "signup" in request.path:
        request_url += "signup"
    else:
        raise Http404

    headersList = {
        "apikey": SUPABASE_PUBLIC_APIKEY,
        "Content-Type": "application/json",
    }

    payload = json.dumps(request.data)

    response = requests.request(
        "POST", request_url, data=payload, headers=headersList, verify=False
    )

    payload = json.loads(response.text)

    if "refresh_token" in payload.keys():
        del payload["refresh_token"]

    return payload
