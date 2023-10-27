# def get_users(*, fetched_by: User) -> Iterable[User]:
#     user_ids = get_visibile_users_for(user=fetched_by)

#     query = Q(id__in == user_ids)

#     return User.objects.filter(query)
