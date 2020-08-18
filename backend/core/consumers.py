import json
from channels.exceptions import DenyConnection
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import AnonymousUser


class ChatConsumer(AsyncWebsocketConsumer):
    room_name: int
    room_group_name: str

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['chat_id']
        self.room_group_name = f'Chat_{self.room_name}'

        if self.scope['user'] == AnonymousUser():
            raise DenyConnection("User does not exists")

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def receive(self, text_data: str = None, bytes_data=None):
        ...
        # game_city = json.loads(text_data).get('game_city')
        #
        # await self.channel_layer.group_send(
        #     self.room_group_name,
        #     {
        #         'type': 'live_score',
        #         'game_id': self.room_name,
        #         'game_city': game_city
        #     }
        # )
    #
    # async def live_score(self, event):
    #     city = event['game_city']
    #     await self.send(text_data=json.dumps({
    #         'score': get_live_score_for_game(self.game, city)
    #     }))

    async def websocket_disconnect(self, message):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
