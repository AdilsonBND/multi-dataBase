docker run \
    --name postgres \
    -e POSTGRES_USER=adilson \
    -e POSTGRES_PASSWORD=senhasecreta \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres


##    docker ps

##    docker -it postgres /bin/bash

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer



docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhasecreta \
    -d \
    mongo:4

docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongobd \
    -d \
    mongoclient/mongoclient


docker exec -it mongodb \
    mongo --host mongodb://admin:senhasecreta@localhost:27017/?authSource=admin \
    --eval "db.getSiblingDB('heroes').createUser({user: 'adilson', pwd: 'senhasecreta', roles: [{role: 'readWrite', db: 'heroes'}]})"


## heroku git:remote --app multidb-project
## heroku apps:list
## git remote -v

## MONGODB_URL=mongodb://adilson:senhasecreta@localhost:27017/heroes?authSource=heroes
## POSTGRES_URL=postgres://adilson:senhasecreta@localhost/heroes
## nvm list