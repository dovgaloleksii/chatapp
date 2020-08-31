from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _

from chat.utils import notify_ws_clients


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


class Message(models.Model):
    text = models.CharField(max_length=256)
    author = models.ForeignKey(
        'core.User',
        on_delete=models.deletion.CASCADE,
        related_name='messages',
    )
    chat = models.ForeignKey(
        'chat.Chat',
        on_delete=models.deletion.CASCADE,
        related_name='messages',
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created', )
        verbose_name = _('Message')
        verbose_name_plural = _('Messages')


@receiver(post_save, sender=Message)
def update_stock(sender, instance: Message, **kwargs):
    users = instance.chat.users
    for user in users.all():
        notify_ws_clients(user, instance)
