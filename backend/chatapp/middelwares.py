from urllib.parse import parse_qs
from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from django.utils.translation import ugettext_lazy as _
from rest_framework import exceptions
from django.db import close_old_connections
from rest_framework_jwt.authentication import jwt_decode_handler, jwt, \
    jwt_get_username_from_payload

from core.models import User


@database_sync_to_async
def authenticate(token: str) -> User:
    try:
        payload = jwt_decode_handler(token)
    except jwt.ExpiredSignature:
        msg = _('Signature has expired.')
        raise exceptions.AuthenticationFailed(msg)
    except jwt.DecodeError:
        msg = _('Error decoding signature.')
        raise exceptions.AuthenticationFailed(msg)
    except jwt.InvalidTokenError:
        raise exceptions.AuthenticationFailed()

    username = jwt_get_username_from_payload(payload)

    if not username:
        msg = _('Invalid payload.')
        raise exceptions.AuthenticationFailed(msg)

    try:
        user = User.objects.get_by_natural_key(username)
    except User.DoesNotExist:
        msg = _('Invalid signature.')
        raise exceptions.AuthenticationFailed(msg)

    if not user.is_active:
        msg = _('User account is disabled.')
        raise exceptions.AuthenticationFailed(msg)

    return user


class TokenAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    see:
    https://channels.readthedocs.io/en/latest/topics/authentication.html#custom-authentication
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return TokenAuthMiddlewareInstance(scope, self)


class TokenAuthMiddlewareInstance:
    def __init__(self, scope, middleware):
        self.middleware = middleware
        self.scope = dict(scope)
        self.inner = self.middleware.inner

    async def __call__(self, receive, send):

        query_string = self.scope['query_string']
        if query_string:
            try:
                parsed_query = parse_qs(query_string)
                token_key = parsed_query[b'token'][0].decode()
                token_name = 'token'
                if token_name == 'token':
                    user = await authenticate(token=token_key)
                    self.scope['user'] = user

                close_old_connections()
            except exceptions.AuthenticationFailed:
                ...

        inner = self.inner(self.scope)
        return await inner(receive, send)


TokenAuthMiddlewareStack = lambda inner: TokenAuthMiddleware(AuthMiddlewareStack(inner))
