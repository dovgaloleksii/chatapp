from channels.routing import ProtocolTypeRouter

from chatapp.middelwares import TokenAuthMiddlewareStack
from chat.routing import websockets

application = ProtocolTypeRouter({
    "websocket": TokenAuthMiddlewareStack(websockets),
})
