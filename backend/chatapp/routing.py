from channels.routing import ProtocolTypeRouter

from chatapp.middelwares import TokenAuthMiddlewareStack
from core.routing import websockets

application = ProtocolTypeRouter({
    "websocket": TokenAuthMiddlewareStack(websockets),
})
