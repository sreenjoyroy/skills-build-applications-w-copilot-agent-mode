"""URL configuration for OctoFit Tracker."""

import os

from django.urls import include, path
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .views import activities_view, leaderboard_view, teams_view, users_view, workouts_view


def _get_base_url() -> str:
    codespace_name = os.getenv("CODESPACE_NAME")
    if codespace_name:
        return f"https://{codespace_name}-8000.app.github.dev"
    return "http://localhost:8000"


@api_view(["GET"])
def api_root(request):
    base_url = _get_base_url()
    return Response(
        {
            "name": "OctoFit Tracker Django API",
            "collections": {
                "users": f"{base_url}/api/users/",
                "teams": f"{base_url}/api/teams/",
                "activities": f"{base_url}/api/activities/",
                "leaderboard": f"{base_url}/api/leaderboard/",
                "workouts": f"{base_url}/api/workouts/",
            },
        }
    )


api_patterns = (
    [
        path("", api_root, name="api_root"),
        path("users/", users_view, name="users"),
        path("teams/", teams_view, name="teams"),
        path("activities/", activities_view, name="activities"),
        path("leaderboard/", leaderboard_view, name="leaderboard"),
        path("workouts/", workouts_view, name="workouts"),
    ],
    "api",
)


urlpatterns = [
    path("", api_root, name="api_root"),
    path("api/", include(api_patterns)),
]

