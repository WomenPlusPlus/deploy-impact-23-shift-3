import requests, json, os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_AUTH_URL = os.environ["SUPABASE_AUTH_URL"]
SUPABASE_PUBLIC_APIKEY = os.environ["SUPABAE_PUBLIC_APIKEY"]


def login_user(request: requests) -> dict:
    reqUrl = SUPABASE_AUTH_URL + "token?grant_type=password"

    headersList = {
        "apikey": SUPABASE_PUBLIC_APIKEY,
        "Content-Type": "application/json",
    }

    payload = json.dumps(request.data)

    response = requests.request(
        "POST", reqUrl, data=payload, headers=headersList, verify=False
    )

    response = json.loads(response.text)

    if "refresh_token" in response.keys():
        del response["refresh_token"]

    return response


def signup_user(request: requests) -> dict:
    reqUrl = SUPABASE_AUTH_URL + "signup"

    headersList = {
        "apikey": SUPABASE_PUBLIC_APIKEY,
        "Content-Type": "application/json",
    }

    payload = json.dumps(request.data)

    response = requests.request(
        "POST", reqUrl, data=payload, headers=headersList, verify=False
    )

    response = json.loads(response.text)

    if "refresh_token" in response.keys():
        del response["refresh_token"]

    return response
