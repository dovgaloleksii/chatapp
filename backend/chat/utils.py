from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from core.models import User


def notify_ws_clients(user: User, message):
    """
    Inform client there is a new message.
    """
    from chat.serializers import MessageSerializer

    notification = {
        'type': 'receive_group_message',
        'chat': message.chat.id,
        'message': MessageSerializer(instance=message).data
    }

    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(f"User_{user.id}", notification)
