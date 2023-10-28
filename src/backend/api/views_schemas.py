from drf_spectacular.utils import OpenApiParameter

login_view_post = {
    "summary": "User login after signup",
    "description": "Use this endpoint to login your user, password or refresh token need to be sent as authentification method, if both are sent, password will be considered the valid one.",
    "request": {
        "application/json": {
            "type": "object",
            "properties": {
                "email": {"type": "string", "required": True},
                "password": {"type": "string"},
                "refresh_token": {"type": "string"},
            },
        },
    },
    "responses": {
        "application/json": {
            "type": "object",
            "properties": {
                "access_token": {"type": "string"},
                "token_type": {"type": "string"},
                "expires_in": {"type": "integer"},
                "expires_at": {"type": "integer"},
                "role": {"type": "string"},
                "last_sign_in_at": {"type": "string"},
                "id": {"type": "integer"},
                "refresh_token": {"type": "string"},
                "first_name": {"type": "string"},
                "last_name": {"type": "string"},
                "preferred_name": {"type": "string"},
            },
        },
    },
}


jobs_views_retrieve = {
    "summary": "Retrieve information for a job",
    "description": """
        Provide the job id in the url parameter and this will retrieve all the information associated with the job.
        
        Optional:
          Hide-Matches: bool
          If true, will not return the matches for faster loading
        """,
    "parameters": [
        OpenApiParameter("job_id", int, OpenApiParameter.PATH, required=True),
        OpenApiParameter("Hide-Matches", bool, OpenApiParameter.HEADER),
    ],
}
