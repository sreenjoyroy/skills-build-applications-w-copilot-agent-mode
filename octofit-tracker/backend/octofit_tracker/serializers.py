from __future__ import annotations

from rest_framework import serializers

from .models import (
    ActivityCollection,
    LeaderboardCollection,
    TeamCollection,
    UserCollection,
    WorkoutCollection,
)


class MongoDocumentSerializer(serializers.Serializer):
    id = serializers.CharField(required=False)

    def to_representation(self, instance):
        if isinstance(instance, dict):
            data = dict(instance)
        else:
            data = dict(instance.__dict__)
        identifier = data.pop("_id", data.pop("id", None))
        if identifier is not None:
            data["id"] = str(identifier)
        return data

    def create(self, validated_data):
        return self.Meta.collection_class.create_document(validated_data)


class UserSerializer(MongoDocumentSerializer):
    name = serializers.CharField(max_length=120)
    email = serializers.EmailField()
    age = serializers.IntegerField(min_value=0)
    team = serializers.CharField(max_length=120)
    points = serializers.IntegerField(min_value=0, required=False, default=0)

    class Meta:
        collection_class = UserCollection


class TeamSerializer(MongoDocumentSerializer):
    name = serializers.CharField(max_length=120)
    coach = serializers.CharField(max_length=120)
    members = serializers.ListField(child=serializers.CharField(max_length=120), default=list)
    points = serializers.IntegerField(min_value=0, required=False, default=0)

    class Meta:
        collection_class = TeamCollection


class ActivitySerializer(MongoDocumentSerializer):
    userName = serializers.CharField(max_length=120)
    activityType = serializers.CharField(max_length=120)
    durationMinutes = serializers.IntegerField(min_value=1)
    caloriesBurned = serializers.IntegerField(min_value=0)
    activityDate = serializers.DateTimeField()
    notes = serializers.CharField(required=False, allow_blank=True, default="")

    class Meta:
        collection_class = ActivityCollection


class LeaderboardEntrySerializer(serializers.Serializer):
    name = serializers.CharField(max_length=120)
    points = serializers.IntegerField(min_value=0)
    rank = serializers.IntegerField(min_value=1)


class LeaderboardSerializer(MongoDocumentSerializer):
    period = serializers.CharField(max_length=120)
    entries = LeaderboardEntrySerializer(many=True)

    class Meta:
        collection_class = LeaderboardCollection


class WorkoutSerializer(MongoDocumentSerializer):
    name = serializers.CharField(max_length=120)
    category = serializers.CharField(max_length=120)
    durationMinutes = serializers.IntegerField(min_value=1)
    difficulty = serializers.CharField(max_length=50)
    description = serializers.CharField()

    class Meta:
        collection_class = WorkoutCollection
