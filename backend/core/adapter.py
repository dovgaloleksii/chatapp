from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.models import EmailConfirmationHMAC
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.contrib.sites.models import Site

from core.models import User
from core.utils import get_image_by_src

import logging
logger = logging.getLogger(__name__)


class RestAccountAdapter(DefaultAccountAdapter):
    FRONTEND_CONFIRM_LOCATION_PATH = '/confirm_email/'

    def get_email_confirmation_url(self, request,
                                   email_confirmation: EmailConfirmationHMAC) -> str:
        origin = request.META.get('HTTP_ORIGIN')

        if not origin:
            site = Site.objects.get_current()
            origin = f'{request.scheme}://{site.domain}'

        url = f'{origin}{self.FRONTEND_CONFIRM_LOCATION_PATH}{email_confirmation.key}/'
        logger.debug(f'[SIGNUP] Send confirmation to email '
                     f'{email_confirmation.email_address} ')
        return url


class RestSocialAccountAdapter(DefaultSocialAccountAdapter):

    def populate_user(self,
                      request,
                      social_login,
                      data) -> User:
        user = super().populate_user(request, social_login, data)

        logo_url = data.get('logo')
        if logo_url and not user.logo.name:
            logo_image, logo_image_name = get_image_by_src(logo_url)
            user.logo = logo_image

        return user
