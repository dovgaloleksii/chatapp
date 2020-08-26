from django.contrib import admin
from chat.models import ChatUser, Chat


class ChatUserInline(admin.TabularInline):
    model = ChatUser
    extra = 1


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    inlines = (ChatUserInline, )
    list_display = ('chat_users', 'is_one_to_one', )
    fields = ('name', 'is_one_to_one')
    exclude = ('created', )

    def chat_users(self, obj):
        return ', '.join(obj.users.values_list('email', flat=True))
