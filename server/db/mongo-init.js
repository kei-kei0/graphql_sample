
db.users.drop();
db.users.insertMany([
    {"githubLogin": "mHattrup", "name": "Mike Hattrup"},
    {"githubLogin": "gPlake", "name": "Glen Plake"},
    {"githubLogin": "sSchmidt", "name": "Scot Shmidt"},
])

db.photos.drop();
db.photos.insertMany([
    {
        "id": "1",
        "name": "SamplePhoto1",
        "description": "SamplePhoto1_desc",
        "category": "ACTION",
        "githubUser": "gPlake",
        "created": "1997-07-03T19:09:32.308Z"
    },
    {
        "id": "2",
        "name": "SamplePhoto2",
        "description": "SamplePhoto2_desc",
        "category": "SELFIE",
        "githubUser": "sSchmidt",
        "created": "1985-07-03T19:09:32.308Z"
    },
    {
        "id": "3",
        "name": "SamplePhoto3",
        "description": "SamplePhoto3_desc",
        "category": "LANDSCAPE",
        "githubUser": "sSchmidt",
        "created": "2018-04-05T19:09:55.308Z"
    },
    {
        "id": "4",
        "name": "SamplePhoto4",
        "description": "SamplePhoto4_desc",
        "category": "SELFIE",
        "githubUser": "gPlake",
        "created": "2000-04-05T19:09:55.308Z"
    },
])

db.tags.drop();
db.tags.insertMany([
    {"photoID": "1", "userID": "gPlake"},
    {"photoID": "2", "userID": "sSchmidt"},
    {"photoID": "2", "userID": "mHattrup"},
    {"photoID": "2", "userID": "gPlake"},
])
