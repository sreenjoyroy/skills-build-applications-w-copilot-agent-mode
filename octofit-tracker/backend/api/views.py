from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def api_root(request):
    return Response(
        {
            "name": "OctoFit Tracker API",
            "status": "ok",
        }
    )


@api_view(["GET"])
def health_check(request):
    return Response({"status": "healthy"})
