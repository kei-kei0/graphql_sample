const Query = require('./Query');
const Mutation = require('./Mutation');
const { Photo, User,  } = require('./Type');

const resolvers = {
    Query,
    Mutation,
    Photo,
    User
}

module.exports = resolvers;
