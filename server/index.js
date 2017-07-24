const express = require('express');
const compression = require('compression');
const config = {
    port: process.env.PORT || 3000
};
const app = express();
const server = createServer();

function createServer() {
    return app
        .use(compression())
        .use('/', express.static('dist'))
        .listen(config.port);
}