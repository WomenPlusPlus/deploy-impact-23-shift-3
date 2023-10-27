from rest_framework.authentication import BaseAuthentication
from rest_framework.permissions import BasePermission
from api.models import Candidates, Associations, Companies
from api import auth_token
from django.db.models import Model
from rest_framework import exceptions


class CustomTokenAuthentication(BaseAuthentication):
    keyword = "Bearer"  # token type

    def authenticate(self, req):
        if "Authorization" not in req.headers:
            return None
        decoded_key = auth_token.authenticate_access_token(req.headers["Authorization"])

        metadata = decoded_key["user_metadata"]
        id = metadata["id"]
        user = get_user_type(decoded_key["role"])

        try:
            user = user(pk=id)
        except user.DoesNotExist:
            raise exceptions.AuthenticationFailed("No such user")

        return user, decoded_key


def get_user_type(role: str) -> Model:
    match role:
        case "candidate":
            user = Candidates
        case "association_user":
            user = Associations
        case "company_user":
            user = Companies

    if user == None:
        raise "User type not found"

    return user


class IsAssociationUser(BasePermission):
    """
    Allows access only to association users.
    """

    def has_permission(self, request, view):
        return bool(request.user and type(request.user) == Associations)


class IsCandidateUser(BasePermission):
    """
    Allows access only to association users.
    """

    def has_permission(self, request, view):
        return bool(request.user and type(request.user) == Candidates)
