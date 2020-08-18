from rest_framework.serializers import ModelSerializer

from core.models import User


class UserDetailsSerializer(ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'first_name', 'last_name', 'logo')
        read_only_fields = ('email', )
