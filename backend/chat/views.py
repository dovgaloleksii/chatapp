from django.db.models import OuterRef, Subquery, Value
from django.db.models.functions import Coalesce

from .models import Chat, Message
from .serializers import ChatSerializer
from rest_framework import generics


class ChatsList(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        message = Message.objects.filter(chat__pk=OuterRef('pk')).values('text')[0:1]
        return qs\
            .filter(users__pk=self.request.user.pk)\
            .annotate(last_message=Coalesce(Subquery(message), Value(None)))
