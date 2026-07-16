"""URL configuration for OctoFit Tracker."""

from django.urls import include, path
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .views import activities_view, leaderboard_view, teams_view, users_view, workouts_view
@api_view(["GET"])
def api_root(request):
    return Response(
        {
            "name": "OctoFit Tracker Django API",
            "collections": {
                "users": "/api/users/",
                "teams": "/api/teams/",
                "activities": "/api/activities/",
                "leaderboard": "/api/leaderboard/",
                "workouts": "/api/workouts/",
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
