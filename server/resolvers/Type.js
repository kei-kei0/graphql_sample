const { GraphQLScalarType } = require('graphql');
const { users, photos, tags } = require('./data');

module.exports = {
    Photo: {
        url: parent => {
            console.log(parent)
            return `http://yoursite.com/img/${parent.id}.jpg`;
        },
        postedBy: parent => {
            console.log(parent)
            console.log(users)
            return users.find(u => u.githubLogin === parent.githubUser)
        },
        taggedUsers: parent => {
            console.log(tags, parent)
            return tags.filter(tag => tag.photoID === parent.id)
                       .map(tag => tag.userID)
                       .map(userID => users.find(u => u.githubLogin === userID))
        }
    },
    User: {
        inPhotos: parent => {
            return tags.filter(tag => tag.userID === parent.id)
                       .map(tag => tag.photoID)
                       .map(photoID => photos.find(p => p.id === photoID))
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
