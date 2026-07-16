from __future__ import annotations

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    ActivityCollection,
    LeaderboardCollection,
    TeamCollection,
    UserCollection,
    WorkoutCollection,
)
from .serializers import (
    ActivitySerializer,
    LeaderboardSerializer,
    TeamSerializer,
    UserSerializer,
    WorkoutSerializer,
)


def _collection_view(serializer_class, collection_class, resource_name):
    @api_view(["GET", "POST"])
    def view(request):
        if request.method == "GET":
            documents = collection_class.list_documents()
            return Response(serializer_class(documents, many=True).data)

        serializer = serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        created_document = serializer.save()
        return Response(serializer_class(created_document).data, status=status.HTTP_201_CREATED)

    view.__name__ = f"{resource_name}_view"
    return view


users_view = _collection_view(UserSerializer, UserCollection, "users")
teams_view = _collection_view(TeamSerializer, TeamCollection, "teams")
activities_view = _collection_view(ActivitySerializer, ActivityCollection, "activities")
leaderboard_view = _collection_view(LeaderboardSerializer, LeaderboardCollection, "leaderboard")
workouts_view = _collection_view(WorkoutSerializer, WorkoutCollection, "workouts")


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
