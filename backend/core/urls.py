from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token,\
    refresh_jwt_token

from core.views import FacebookLogin, GoogleLogin, FacebookConnect, GoogleConnect

urlpatterns = [
    path('accounts/', include('allauth.urls'), name='accounts'),
    path('', include('rest_auth.urls')),
    path('facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('facebook/connect/', FacebookConnect.as_view(), name='fb_connect'),
    path('google/', GoogleLogin.as_view(), name='google_login'),
    path('google/connect/', GoogleConnect.as_view(), name='google_connect'),
    path('token/', obtain_jwt_token, name='token_obtain_pair'),
    path('token/refresh/', refresh_jwt_token, name='token_refresh'),
    path('token/verify/', verify_jwt_token, name='token_verify'),
]
