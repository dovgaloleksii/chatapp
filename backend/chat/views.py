from django.db.models import OuterRef, Subquery, Value
from django.db.models.functions import Coalesce

from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
from rest_framework import generics, viewsets, permissions, exceptions


class ChatsList(viewsets.ModelViewSet, generics.RetrieveAPIView):
    queryset = Chat.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ChatSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        message = Message.objects\
            .filter(chat__pk=OuterRef('pk'))\
            .values('text')[0:1]
        return qs\
            .filter(users__pk=self.request.user.pk)\
            .annotate(last_message=Coalesce(Subquery(message), Value(None)))


class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = MessageSerializer

    def get_serializer_context(self):
        context = super(MessageList, self).get_serializer_context()
        return {
            **context,
            "chat_id": self.kwargs.get('chat_id')
        }

    def get_queryset(self):
        chat_id = self.kwargs.get('chat_id')
        if not chat_id:
            raise exceptions.NotFound()

        qs = super().get_queryset()
        return qs.filter(chat__pk=chat_id)
