from django.urls import path
from channels.routing import URLRouter
from .consumers import ChatConsumer

websockets = URLRouter([
    path(
        "ws/live-score/<int:game_id>", ChatConsumer,
        name="live-score",
    ),
])
