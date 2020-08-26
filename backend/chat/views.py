from .models import Chat
from .serializers import ChatSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class ChatsList(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(users__pk=self.request.user.pk)
