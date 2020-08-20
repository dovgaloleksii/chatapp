from rest_auth.registration.serializers import \
    RegisterSerializer as BaseRegisterSerializer
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.models import User

import logging
logger = logging.getLogger(__name__)


class UserDetailsSerializer(ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'first_name', 'last_name', 'logo')
        read_only_fields = ('email', )


class RegisterSerializer(BaseRegisterSerializer):
    """
    Custom RegisterSerializer
    Set email to username
    """
    username = None
    cleaned_data: dict = {}
    first_name = serializers.CharField(
        max_length=50,
        required=False,
    )
    last_name = serializers.CharField(
        max_length=50,
        required=False,
    )

    def get_cleaned_data(self) -> dict:
        return {
            'username': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'logo': self.validated_data.get('logo', None),
        }

    def create(self, validated_data):
        ...

    def update(self, instance, validated_data):
        ...

    def custom_signup(self, request, user: User):
        logo = self.cleaned_data.get('logo', None)
        user.logo = logo
        user.save()
        logger.debug(f'[SIGNUP] New user created - {user.username}.')
