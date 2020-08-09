const { authorizeWithGithub } = require('./lib/util');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

module.exports = {
    async postPhoto(parent, args, { db, currentUser }) {
        console.log(parent, args)
        if(!currentUser) {
            throw new Error('only an authorized user can post a photo.'); 
        }
        const newPhoto = {
            ...args.input,
            githubLogin: currentUser.githubLogin,
            created: new Date()
        }
        const { insertedIds } = await db.collection('photos').insert(newPhoto);
        console.log(typeof insertedIds, insertedIds)
        newPhoto.id = insertedIds[0];
        return newPhoto;
    },
    async githubAuth(parent, { code }, { db }) {
        const {
            message,
            access_token,
            avator_url,
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
            avatar: avator_url
        }
        const { ops:[user] } = await db.collection('users').replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true })
        return  { user, token: access_token }
    }
}
