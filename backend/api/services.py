import requests, json


def login_user(request: requests) -> dict:
    reqUrl = (
        "https://db.icuxzklnmyobfjgxudoh.supabase.co//auth/v1/token?grant_type=password"
    )

    headersList = {
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljdXh6a2xubXlvYmZqZ3h1ZG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4OTYzOTEsImV4cCI6MjAxMTQ3MjM5MX0.bPi5hV-602hEsdKsvsbdjzSMJXhVTAopQQNadFBF_Eo",
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
