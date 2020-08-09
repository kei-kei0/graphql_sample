const fetch = require('node-fetch');
const { authorizeWithGithub } = require('./lib/util');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

module.exports = {
    addFakeUsers: async(parent, { count }, { db }) => {
        const randomUserApi = `https://randomuser.me/api/?results=${count}`;
        const { results } = await fetch(randomUserApi).then(res => res.json());
        const users = results.map(r => ({
            githubLogin: r.login.username,
            name: `${r.name.first} ${r.name.last}`,
            avatar: r.picture.thumbnail,
            created: r.registered.date,
            githubToken: r.login.sha1
        }));
        await db.collection('users').insert(users);
        return users
    },
    postPhoto: async(parent, args, { db, currentUser }) => {
        if(!currentUser) {
            throw new Error('only an authorized user can post a photo.'); 
        }
        const newPhoto = {
            ...args.input,
            githubLogin: currentUser.githubLogin,
            created: new Date()
        }
        const { insertedIds } = await db.collection('photos').insert(newPhoto);
        newPhoto.id = insertedIds[0];
        return newPhoto;
    },
    fakeUserAuth: async(parent, { githubLogin }, { db }) => {
        const user = await db.collection('users').findOne({ githubLogin });
        if (!user) {
            throw new Error(`Cannot find user with githubLogin "${githubLogin}"`);
        }
        return {
            token: user.githubToken,
            user
        }
    },
    githubAuth: async(parent, { code }, { db }) => {
        const {
            message,
            access_token,
            avatar_url,
            login,
            name
        } = await authorizeWithGithub({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
        });
        if (message) {
            throw new Error(message);
        }
        const latestUserInfo = {
            name,
            githubLogin: login,
            githubToken: access_token,
            avatar: avatar_url
        }
        const { ops:[user] } = await db.collection('users').replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true })
        return  { user, token: access_token }
    }
}
