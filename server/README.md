```
# start server
## 1. start mongodb on docker
docker-compose -f ./db/docker-compose.yaml up -d
## 2. start express server
npm start

# enter into process in docker and start mongo
docker exec -it dev-db bash
mongo -u root -p pass
use dev
# run query (e.g. list all users)
db.users.find()

# request with curl
curl localhost:4001/graphql -H 'Content-Type: application/json' --data '{"query": "{totalPhotos}"}'

# playground
http://localhost:4001/graphql


# mongodb for local development
## start
docker-compose -f ./db/docker-compose.yaml up -d
## stop and delete
docker-compose -f ./db/docker-compose.yaml down --rmi all --volumes
```

# How to get access_token

## step1: get code
### access to the following url and sign in with your github account.
https://github.com/login/oauth/authorize?client_id={CLIENT_ID}&scope=user

### and then you will be redirected to the following url with code parameter.
http://localhost:4001/?code={YOUR_CODE}

## step2: get access_token
```
curl localhost:4001/graphql -H 'Content-Type: application/json' \
--data '{"query" : "mutation($code:String!){githubAuth(code:$code){ token user { githubLogin name avator } } }", "variables" : "{\"code\" : \"<YOUR_CODE>\"}"}'
```
