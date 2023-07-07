const express = require('express');
const router = express.Router();
const {AirplaneTicket, validate} = require('../models/airplaneTicket');
const auth = require('../middleware/auth');

router.get('/:id', async(req, res) => {
    const ticket = await AirplaneTicket.findById(req.params._id);
    res.send(ticket);
});

router.get('/including-vips', async(req, res) => {
    const tickets = await AirplaneTicket
        .find()
        .sort('price');
    res.send(tickets);
});

router.get('/without-vips', async(req, res) => {
    const tickets = await AirplaneTicket
        .find({isVip: false})
        .sort('price');
    res.send(tickets);
});
// other handlers

module.exports = router;
