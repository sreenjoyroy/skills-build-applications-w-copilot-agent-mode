from django.contrib import admin


admin.site.site_header = "OctoFit Tracker Administration"
admin.site.site_title = "OctoFit Tracker Admin"
admin.site.index_title = "Mongo-backed collections"

SUPPORTED_COLLECTIONS = ["users", "teams", "activities", "leaderboard", "workouts"]
