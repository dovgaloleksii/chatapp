from django.db import models
from django.utils.translation import ugettext_lazy as _


class ChatUser(models.Model):
    user = models.ForeignKey(
        'core.User',
        on_delete=models.deletion.CASCADE,
        related_name='chats_relations',
    )
    chat = models.ForeignKey(
        'chat.Chat',
        on_delete=models.deletion.CASCADE,
        related_name='chats_users',
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (('user', 'chat'), )


class Chat(models.Model):
    users = models.ManyToManyField('core.User', through=ChatUser, related_name='chats')
    name = models.CharField(max_length=256, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    is_one_to_one = models.BooleanField(default=True)

    class Meta:
        verbose_name = _('Chat')
        verbose_name_plural = _('Chats')
