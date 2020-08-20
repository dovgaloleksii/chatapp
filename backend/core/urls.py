from django.urls import path, include
from django.views.generic import TemplateView
from rest_auth.views import (
    LogoutView,
    UserDetailsView,
)
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token,\
    refresh_jwt_token

from core.views import FacebookLogin, GoogleLogin, FacebookConnect, GoogleConnect

urlpatterns = [
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('registration/', include('rest_auth.registration.urls')),
    path('facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('facebook/connect/', FacebookConnect.as_view(), name='fb_connect'),
    path('google/', GoogleLogin.as_view(), name='google_login'),
    path('google/connect/', GoogleConnect.as_view(), name='google_connect'),
    path('token/', obtain_jwt_token, name='token_obtain_pair'),
    path('token/refresh/', refresh_jwt_token, name='token_refresh'),
    path('token/verify/', verify_jwt_token, name='token_verify'),

    # Required template view for registration
    path('account-email-verification-sent/', TemplateView.as_view(),
         name='account_email_verification_sent'),
    path('socialaccount_signup/', TemplateView.as_view(),
         name='socialaccount_signup'),
]
