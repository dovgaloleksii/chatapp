from django.urls import path
from channels.routing import URLRouter
from .consumers import ChatConsumer

websockets = URLRouter([
    path(
        "ws/chat/", ChatConsumer,
        name="live-score",
    ),
])
