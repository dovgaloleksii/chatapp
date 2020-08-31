from django.urls import path

from chat.views import ChatsList, MessageList
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', ChatsList, basename='chats')

urlpatterns = [
    *router.urls,
    # path('chat/', ChatsList.as_view(), name='chats'),
    # path('chat/<int:chat_id>/', MessageList.as_view(), name='chats'),
    path('<int:chat_id>/messages/', MessageList.as_view(), name='chat_messages'),
]
