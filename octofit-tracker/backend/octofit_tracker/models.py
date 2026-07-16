from __future__ import annotations

from typing import Any, ClassVar

from django.conf import settings


def get_mongo_database():
    return settings.MONGO_DB


def serialize_document(document: dict[str, Any]) -> dict[str, Any]:
    payload = dict(document)
    identifier = payload.pop("_id", payload.pop("id", None))
    if identifier is not None:
        payload["id"] = str(identifier)
    return payload


class MongoCollection:
    collection_name: ClassVar[str]

    @classmethod
    def collection(cls):
        return get_mongo_database()[cls.collection_name]

    @classmethod
    def list_documents(cls) -> list[dict[str, Any]]:
        return [serialize_document(document) for document in cls.collection().find().sort("createdAt", -1)]

    @classmethod
    def create_document(cls, data: dict[str, Any]) -> dict[str, Any]:
        payload = dict(data)
        payload.pop("id", None)
        result = cls.collection().insert_one(payload)
        payload["_id"] = result.inserted_id
        return serialize_document(payload)


class UserCollection(MongoCollection):
    collection_name = "users"


class TeamCollection(MongoCollection):
    collection_name = "teams"


class ActivityCollection(MongoCollection):
    collection_name = "activities"


class LeaderboardCollection(MongoCollection):
    collection_name = "leaderboard"


class WorkoutCollection(MongoCollection):
    collection_name = "workouts"
