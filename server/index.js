const resolvers = require('./resolvers');
const { readFileSync } = require('fs');
const { ApolloServer } = require('apollo-server');

require('dotenv').config()
const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')

const server = new ApolloServer({
    typeDefs,
    resolvers
});

console.log(resolvers)

server.listen(4001).then(({ url }) => console.log(`Graphql Service is running on ${url}`));
