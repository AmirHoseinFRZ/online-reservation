const express = require('express');
const users = require('../routes/users');
const airplaneTickets = require('../routes/airplaneTickets');
const trainTickets = require('../routes/trainTickets');
const buyAirplaneTicket = require('../routes/buyAirpaneTicket');
const buyTrainTicket = require('../routes/buyTrainTicket');
// other routes
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/airplane-tickets', airplaneTickets);
    app.use('/api/train-tickets', trainTickets);
    app.use('/api/buy-airplane-ticket', buyAirplaneTicket);
    app.use('/api/buy-train-ticket', buyTrainTicket);
    // other routers
    app.use(error);
};

