from allauth.socialaccount.admin import SocialAccountAdmin as BaseSocialAccountAdmin
from allauth.socialaccount.fields import JSONField
from allauth.socialaccount.models import SocialAccount
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django_json_widget.widgets import JSONEditorWidget

from core.models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('logo', ), }),
        *UserAdmin.fieldsets,
    )


admin.site.unregister(SocialAccount)


@admin.register(SocialAccount)
class SocialAccountAdmin(BaseSocialAccountAdmin):
    formfield_overrides = {
        JSONField: {'widget': JSONEditorWidget},
    }
