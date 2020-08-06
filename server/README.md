```
# server起動
npm start

# request from curl
curl localhost:4001/graphql -H 'Content-Type: application/json' --data '{"query": "{totalPhotos}"}'

# playground
http://localhost:4001/playground


# local開発用のmong
起動
docker-compose -f ./db/docker-compose.yaml up
停止
docker-compose -f ./db/docker-compose.yaml down --rmi all --volumes
```
