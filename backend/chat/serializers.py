from rest_framework import serializers
from chat.models import Chat, ChatUser
import logging

from core.models import User

logger = logging.getLogger(__name__)


class ChatUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('pk', 'first_name', 'last_name', 'logo', 'username')


class ChatUsersSerializer(serializers.HyperlinkedModelSerializer):
    user = ChatUserSerializer()

    class Meta:
        model = ChatUser
        fields = ('pk', 'user', 'created', )


class ChatSerializer(serializers.ModelSerializer):
    chat_users = ChatUsersSerializer(source='chats_users', many=True)

    class Meta:
        model = Chat
        fields = ('pk', 'chat_users', 'is_one_to_one', 'created', )
