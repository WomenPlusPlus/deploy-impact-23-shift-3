from rest_framework import routers
from collections import OrderedDict


# Create a router subclassed from DefaultRouter and give it a list[dict] as input
class APIRouter(routers.DefaultRouter):
    """
    Customized Default Router to include non-viewset views on root page
    """

    singleViews: list

    def __init__(self, singleViews: list, *args, **kwargs):
        self.singleViews = singleViews
        super().__init__(*args, **kwargs)

    def get_api_root_view(self, api_urls=None):
        """
        Return a basic root view.
        """
        api_root_dict = OrderedDict()
        list_name = self.routes[0].name
        for prefix, viewset, basename in self.registry:
            api_root_dict[prefix] = list_name.format(basename=basename)
        for singleView in self.singleViews:
            api_root_dict[singleView["route"]] = singleView["name"]
        return self.APIRootView.as_view(api_root_dict=api_root_dict)
