from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

# For Gunicorn to serve static files
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from api.routers import router as api_view_router
from api.routers import singleViews

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
    path("api/", include(api_view_router.urls)),
]

urlpatterns += staticfiles_urlpatterns()

urlpatterns.extend(
    [path(route=i["route"], view=i["view"], name=i["name"]) for i in singleViews]
)
