const express = require('express');
const users = require('../routes/users');
const airplaneTickets = require('../routes/airplaneTickets');
const trainTickets = require('../routes/trainTickets');
const buyAirplaneTickets = require('../routes/buyAirpaneTickets');
const buyTrainTickets = require('../routes/buyTrainTickets');
const hotelRooms = require('../routes/hotelRooms');
const reserveHotelRooms = require('../routes/reserveHotelRooms');
const editProfiles = require('../routes/editProfiles')
// other routes
const error = require('../middleware/error');
const limiter = require('../middleware/limitter');

module.exports = function(app) {
    app.use(express.json());
    app.use(limiter);
    app.use('/api/users', users);
    app.use('/api/airplane-tickets', airplaneTickets);
    app.use('/api/train-tickets', trainTickets);
    app.use('/api/buy-airplane-tickets', buyAirplaneTickets);
    app.use('/api/buy-train-tickets', buyTrainTickets);
    app.use('/api/hotel-rooms', hotelRooms);
    app.use('/api/reserve-hotel-rooms', reserveHotelRooms);
    app.use('/api/edit-profile');
    // other routers
    app.use(error);
};

