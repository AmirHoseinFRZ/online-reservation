const express = require('express');
const users = require('../routes/users');
const airplaneTickets = require('../routes/airplaneTickets');
const trainTickets = require('../routes/trainTickets');
const buyAirplaneTickets = require('../routes/buyAirpaneTickets');
const buyTrainTickets = require('../routes/buyTrainTickets');
const hotelRooms = require('../routes/hotelRooms');
const reserveHotelRoom = require('../routes/reserveHotelRoom');
// other routes
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/airplane-tickets', airplaneTickets);
    app.use('/api/train-tickets', trainTickets);
    app.use('/api/buy-airplane-ticket', buyAirplaneTickets);
    app.use('/api/buy-train-ticket', buyTrainTickets);
    app.use('/api/hotel-rooms', hotelRooms);
    app.use('/api/reserve-hotel-room');
    // other routers
    app.use(error);
};

