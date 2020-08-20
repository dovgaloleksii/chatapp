from allauth.socialaccount.providers.facebook.provider import FacebookProvider
from allauth.socialaccount.providers.google.provider import GoogleProvider


class FacebookWithLogoProvider(FacebookProvider):
    id = 'facebook'

    def extract_common_fields(self, data):
        serialized_data = super().extract_common_fields(data)

        logo_url = data.get('picture', {}).get('data', {}).get('url', None)
        serialized_data.update({
            'username': serialized_data.get('email'),
            'logo': logo_url,
        })
        return serialized_data


class GoogleWithLogoProvider(GoogleProvider):
    id = 'google'

    def extract_common_fields(self, data):
        serialized_data = super().extract_common_fields(data)

        logo_url = data.get('picture')
        serialized_data.update({
            'username': serialized_data.get('email'),
            'logo': logo_url,
        })
        return serialized_data


provider_classes = [
    FacebookWithLogoProvider,
    GoogleWithLogoProvider,
]
