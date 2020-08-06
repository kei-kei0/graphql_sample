const resolvers = require('./resolvers');
const express = require('express');
const expressPlayground = require('graphql-playground-middleware-express');
const { ApolloServer } = require('apollo-server-express');
const { readFileSync } = require('fs');
const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers
});
server.applyMiddleware({ app });

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
app.get('/', (req, res) => {
    res.send('welcome to the graphql Sample API');
})
app.listen({ port: 4001 }, () => {
    console.log(`Graphql Service is running on ${server.graphqlPath}`)
});
