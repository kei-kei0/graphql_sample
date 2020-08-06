const resolvers = require('./resolvers');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { readFileSync } = require('fs');
const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8');

const { MongoClient } = require('mongodb');
require('dotenv').config();

const start = async() => {
    const MONGO_DB = process.env.DB_HOST;
    const dbConnection = await MongoClient.connect(
        MONGO_DB,
        { useUnifiedTopology: true, useNewUrlParser: true }
    );
    const db = dbConnection.db('dev');
    const context = { db };

    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context
    });
    server.applyMiddleware({ app });

    app.get('/', (req, res) => {
        res.send('welcome to the graphql Sample API');
    })
    app.listen({ port: 4001 }, () => {
        console.log(`Graphql Service is running on ${server.graphqlPath}`)
    });
}

start();
