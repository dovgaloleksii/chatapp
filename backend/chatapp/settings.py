"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""
import datetime
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY',
                            '^ua8a93^=z0gg8ss+1wwpc6b5k91!ei%%s*0fe-1!q28o18+u^')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'rest_framework',
    'drf_yasg',
    'channels',
    'corsheaders',
    'django_json_widget',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'rest_auth.registration',
    'chatapp',
    'core',
]

EMAIL_HOST = "0.0.0.0"
EMAIL_PORT = 1025
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_USE_TLS = False

SITE_ID = 1

CORS_ORIGIN_WHITELIST = [
    "http://localhost:8080",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'chatapp.wsgi.application'
AUTH_USER_MODEL = 'core.User'


# Auth settings
REST_USE_JWT = True

LOGIN_URL = '/admin/login/'
LOGOUT_URL = '/admin/logout/'

ACCOUNT_ADAPTER = 'core.adapter.RestAccountAdapter'
ACCOUNT_EMAIL_SUBJECT_PREFIX = '[Chatapp]'
ACCOUNT_EMAIL_VERIFICATION = "mandatory"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False

JWT_AUTH = {
    'JWT_ALLOW_REFRESH': True,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=3600),
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(seconds=3600 * 3),
}

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'core.serializers.UserDetailsSerializer',
}

REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'core.serializers.RegisterSerializer',
}

SOCIALACCOUNT_ADAPTER = 'core.adapter.RestSocialAccountAdapter'
SOCIALACCOUNT_QUERY_EMAIL = True
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        },
        'APP': {
            'secret': os.environ.get('GOOGLE_SECRET', ''),
            'key':  os.environ.get('GOOGLE_KEY', '')
        }
    },
    'facebook': {
        'SCOPE': [
            'public_profile',
            'user_birthday',
            'user_gender',
            'user_photos',
            'email',
            'user_link',
        ],
        'FIELDS': [
            'id',
            'first_name',
            'last_name',
            'email',
            'picture',
            'photos',
            'link',
            'gender',
            'birthday',
        ],
        'LOCALE_FUNC': lambda request: 'en_US',
        'VERSION': 'v8.0',
        'APP': {
            'secret': os.environ.get('FACEBOOK_SECRET', ''),
            'key':  os.environ.get('FACEBOOK_KEY', ''),
        }
    }
}

ROOT_URLCONF = 'chatapp.urls'

AUTHENTICATION_BACKENDS = (
    'allauth.account.auth_backends.AuthenticationBackend',
    'django.contrib.auth.backends.ModelBackend',
)


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DATABASE_NAME', 'chatapp'),
        'USER': os.environ.get('DATABASE_USER', 'chatapp'),
        'PASSWORD': os.environ.get('DATABASE_PASSWORD', 'chatapp'),
        'HOST': os.environ.get('DATABASE_HOST', 'localhost'),
        'PORT': os.environ.get('DATABASE_PORT', '5432'),
    }
}

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

ASGI_APPLICATION = "chatapp.routing.application"
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [os.environ.get('CHANNEL_REDIS_HOST', '127.0.0.1:6379')],
        },
    },
}

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/
DEFAULT_FILE_STORAGE = 'cgatapp.storages.MediaStorage'
STATICFILES_STORAGE = 'chatapp.storages.StaticStorage'

AWS_S3_FILE_OVERWRITE = False
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID', '')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY', '')
AWS_STORAGE_BUCKET_NAME = 'chatapp'

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

MAIN_LOG_LEVEL = 'DEBUG' if DEBUG else 'INFO'
SERVICE_LOG_LEVEL = 'INFO' if DEBUG else 'WARNING'
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'verbose': {
            'format': '%(asctime)s [%(levelname)s] %(name)s '
                      '%(funcName)s %(lineno)d %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'chatapp': {
            'level': MAIN_LOG_LEVEL,
            'handlers': ['console'],
            'propagate': False,
        },
        'core': {
            'level': MAIN_LOG_LEVEL,
            'handlers': ['console'],
            'propagate': False,
        },
        'django': {
            'level': SERVICE_LOG_LEVEL,
            'handlers': ['console'],
            'propagate': False,
        },
        'django.server': {
            'level': SERVICE_LOG_LEVEL,
            'handlers': ['console'],
            'propagate': False,
        },
        'asyncio': {
            'level': SERVICE_LOG_LEVEL,
            'handlers': ['console'],
            'propagate': False,
        },
        'channels': {
            'level': SERVICE_LOG_LEVEL,
            'handlers': ['console'],
            'propagate': False,
        },
        'channels_redis': {
            'level': SERVICE_LOG_LEVEL,
            'handlers': ['console'],
            'propagate': False,
        },
        'daphne': {
            'level': SERVICE_LOG_LEVEL,
            'handlers': ['console'],
            'propagate': False,
        },
        'uvicorn': {
            'level': SERVICE_LOG_LEVEL,
            'handlers': ['console'],
            'propagate': False,
        },
    },
}
