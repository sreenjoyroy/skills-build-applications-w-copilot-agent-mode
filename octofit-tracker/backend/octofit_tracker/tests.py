from __future__ import annotations

from unittest.mock import patch

from django.test import Client, TestCase


class OctofitTrackerApiTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_root_points_to_api_root(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["name"], "OctoFit Tracker Django API")

    def test_users_collection_lists_documents(self):
        with patch("octofit_tracker.models.UserCollection.list_documents", return_value=[{"id": "1", "name": "Ava", "email": "ava@example.test", "age": 15, "team": "Thunder Striders", "points": 100}]):
            response = self.client.get("/api/users/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_users_collection_creates_document(self):
        payload = {"name": "Ava", "email": "ava@example.test", "age": 15, "team": "Thunder Striders", "points": 100}

        with patch("octofit_tracker.models.UserCollection.create_document", return_value={"id": "1", **payload}):
            response = self.client.post("/api/users/", payload, content_type="application/json")

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["name"], "Ava")
