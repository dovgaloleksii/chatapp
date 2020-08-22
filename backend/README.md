# Chatapp backend

## Startup instructions


- Run required services (db and redis)
- Provide [env variables](#env-vars)
- Create new virtualenv
- Install packages 

        pip install -r requirenments.txt
- Apply all migrations 

        python manage.py migrate
        
- Run server 

        python manage.py runserver


## Env vars

| Variable name | Usage | 
| :---: | :---: |
| *Core* |
| SECRET_KEY | Django secret key | 
| DATABASE_NAME | Database name *default:* **chatapp** | 
| DATABASE_USER | Database name *default:* **chatapp** | 
| DATABASE_PASSWORD | Database name *default:* **chatapp** | 
| DATABASE_HOST | Database name *default:* **127.0.0.1** | 
| DATABASE_PORT | Database name *default:* **5432** | 
| CHANNEL_REDIS_HOST | Database name *default:* **127.0.0.1:6379** | 
| *Oauth* |
| FACEBOOK_KEY | Facebook api key | 
| FACEBOOK_SECRET | Facebook api secret | 
| GOOGLE_KEY | Google api key | 
| GOOGLE_SECRET | Google api secret | 
