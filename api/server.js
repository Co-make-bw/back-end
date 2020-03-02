require('dotenv').config();
const express = require('express');

const apiRouter = require('./api-router.js');
const configureMiddleware = require('./configure-middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.send('<h1>Hello from Co-make 4</h1>')
});

module.exports = server;