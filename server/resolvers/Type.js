const { GraphQLScalarType } = require('graphql');
const { users, photos, tags } = require('./data');

module.exports = {
    Photo: {
        id: parent => parent.id || parent._id,
        url: parent => `/img//photos/${parent._id}.jpg`,
        postedBy: (parent, args, { db }) => {
            return db.collection('users').findOne({ githubLogin: parent.githubLogin });
        },
        taggedUsers: (parent, args, { db }) => {
            return db.collection('tags').find({ photoID: parent._id.toString() }).toArray().map(tag => tag.githubLogin);
        }
    },
    User: {
        postedPhotos: (parent, args, { db }) => {
            return db.collection('photos').find({ githubLogin: parent.githubLogin }).toArray();
        },
        inPhotos: async (parent, args, { db }) => {
            return db.collection('tags').find({ githubLogin: parent.githubLogin }).toArray().map(tag => tag.photoID);
        }
    },
    DateTime: new GraphQLScalarType({
        name: "DateTime",
        description: "a valid datetime value",
        parseValue: value => new Date(value),
        serialize: value => new Date(value).toISOString(),
        parseLiteral: ast => ast.value
    })
}
