'use strict';

const express = require('express');
const app = express();

const notFoundHandler = require('./handlers/404.js');
const errorHandler = require('./handlers/500.js');
const timeStamper = require('./middleware/stamper.js');

app.get('/', getHomePage);
app.get('/data', timeStamper, getData);
app.get('/bad', forceError);

app.use('*', notFoundHandler);
app.use(errorHandler);

function getHomePage(req, res) {
    res.status(200).send('Hello World')
}

function getData(req, res) {
    let outputObject = {
        10: "even",
        5: "odd",
        "time": req.timestamp
    }
    res.status(200).json(outputObject);
}

function forceError(req, res, next) {
    next('you messed up');
}

function start(port) {
    app.listen(port, () => {
        console.log(`Server up on port ${port}`)
    });
}

module.exports = {
    app: app,
    start: start
}