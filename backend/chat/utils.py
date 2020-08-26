from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from core.models import User


def notify_ws_clients(user: User):
    """
    Inform client there is a new message.
    """
    notification = {
        'type': 'receive_group_message',
        'message': '{}'.format(user.id)
    }

    channel_layer = get_channel_layer()
    print("user.id {}".format(user.id))

    async_to_sync(channel_layer.group_send)(f"User_{user.id}", notification)
