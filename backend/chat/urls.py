from django.urls import path

from chat.views import ChatsList

urlpatterns = [
    path('chat/', ChatsList.as_view(), name='chats'),
]
