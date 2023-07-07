const express = require('express');
const users = require('../routes/users');
const airplaneTickets = require('../routes/airplaneTickets');
const trainTickets = require('../routes/trainTickets');
// other routes
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/airplane-tickets', airplaneTickets)
    app.use('api/train-tickets', trainTickets())
    // other routers
    app.use(error);
};

