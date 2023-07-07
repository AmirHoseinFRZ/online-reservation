const express = require('express');
const router = express.Router();
const {AirplaneTicket, validate} = require('../models/airplaneTicket');
const isAdmin = require('../middleware/admin');
const isVip = require('../middleware/vip');
const auth = require('../middleware/auth');

router.get('/:id', async(req, res) => {
    const ticket = await AirplaneTicket.findById(req.params._id);
    res.send(ticket);
});

router.get('/including-vips', isVip, async(req, res) => {
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

router.post('/', [isAdmin, auth], async(req , res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let ticket = new AirplaneTicket({
        origin: req.body.origin,
        destination: req.body.destination,
        airLine: req.body.airLine,
        departureTime: req.body.departureTime,
        arrivalTime: req.body.arrivalTime,
        flightNumber: req.body.flightNumber,
        terminal: req.body.terminal,
        price: req.body.price,
        quantity: req.body.quantity,
        isVip: req.body.isVip
        });
    ticket = await ticket.save();

    res.send(ticket);
})

router.delete('/:id', [isAdmin, auth], async(req , res) => {
    const ticket = await AirplaneTicket.findByIdAndRemove(req.params.id);

    if (!ticket) return res.status(404).send('The ticket with the given ID was not found.');

    res.send(ticket);
})
// other handlers

module.exports = router;
