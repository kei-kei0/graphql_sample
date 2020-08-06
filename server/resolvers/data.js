const users = [
    {"githubLogin": "mHattrup", "name": "Mike Hattrup"},
    {"githubLogin": "gPlake", "name": "Glen Plake"},
    {"githubLogin": "sSchmidt", "name": "Scot Shmidt"},
];
const photos = [
    {
        "id": "1",
        "name": "SamplePhoto1",
        "description": "SamplePhoto1_desc",
        "category": "ACTION",
        "githubUser": "gPlake",
        "created": "3-28-1977"
    },
    {
        "id": "2",
        "name": "SamplePhoto2",
        "description": "SamplePhoto2_desc",
        "category": "SELFIE",
        "githubUser": "sSchmidt",
        "created": "1-2-1985"
    },
    {
        "id": "3",
        "name": "SamplePhoto3",
        "description": "SamplePhoto3_desc",
        "category": "LANDSCAPE",
        "githubUser": "sSchmidt",
        "created": "2018-04-05T19:09:55.308Z"
    },
];
let id = photos.map(p => p.id).reduce((prev, curr) => Math.max(prev, curr)) + 1;
const tags = [
    {"photoID": "1", "userID": "gPlake"},
    {"photoID": "2", "userID": "sSchmidt"},
    {"photoID": "2", "userID": "mHattrup"},
    {"photoID": "2", "userID": "gPlake"},
]

module.exports = {
    users,
    photos,
    tags,
    id
}
