import json
from channels.exceptions import DenyConnection
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser


class ChatConsumer(AsyncWebsocketConsumer):
    room_name: int
    room_group_name: str

    async def connect(self):
        if self.scope['user'] == AnonymousUser():
            raise DenyConnection("User does not exists")

        self.room_name = self.scope['user'].pk
        self.room_group_name = f'User_{self.room_name}'
        print(self.room_group_name, )

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        print(text_data)
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': 'receive_group_message',
                'message': message
            }
        )

    async def receive_group_message(self, event):
        print(event)
        message = event['message']
        await self.send(text_data=json.dumps({'message': message}))

    async def disconnect(self, message):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
