
db.users.drop();
db.users.insertMany([
    {"githubLogin": "mHattrup", "name": "Mike Hattrup", "created": "2017-04-05T19:09:55.308Z", "githubToken": "token1"},
    {"githubLogin": "gPlake", "name": "Glen Plake", "created": "2017-04-05T19:09:55.308Z", "githubToken": "token2"},
    {"githubLogin": "sSchmidt", "name": "Scot Shmidt", "created": "2017-04-05T19:09:55.308Z", "githubToken": "token3"},
])

db.photos.drop();
db.photos.insertMany([
    {
        "id": "1",
        "name": "SamplePhoto1",
        "description": "SamplePhoto1_desc",
        "category": "ACTION",
        "githubLogin": "gPlake",
        "created": "1997-07-03T19:09:32.308Z"
    },
    {
        "id": "2",
        "name": "SamplePhoto2",
        "description": "SamplePhoto2_desc",
        "category": "SELFIE",
        "githubLogin": "sSchmidt",
        "created": "1985-07-03T19:09:32.308Z"
    },
    {
        "id": "3",
        "name": "SamplePhoto3",
        "description": "SamplePhoto3_desc",
        "category": "LANDSCAPE",
        "githubLogin": "sSchmidt",
        "created": "2018-04-05T19:09:55.308Z"
    },
    {
        "id": "4",
        "name": "SamplePhoto4",
        "description": "SamplePhoto4_desc",
        "category": "SELFIE",
        "githubLogin": "gPlake",
        "created": "2000-04-05T19:09:55.308Z"
    },
])

db.tags.drop();
db.tags.insertMany([
    {"photoID": "1", "githubLogin": "gPlake"},
    {"photoID": "2", "githubLogin": "sSchmidt"},
    {"photoID": "2", "githubLogin": "mHattrup"},
    {"photoID": "2", "githubLogin": "gPlake"},
])
