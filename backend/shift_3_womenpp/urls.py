from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from django.contrib import admin
from api.routers import *

# For Gunicorn to serve static files
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]

urlpatterns += staticfiles_urlpatterns()

urlpatterns.extend(
    [path(route=i["route"], view=i["view"], name=i["name"]) for i in singleViews]
)
