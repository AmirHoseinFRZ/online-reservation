const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {TrainTicket, validate} = require('../models/airplaneTicket');
const isAdmin = require('../middleware/admin');
const isVip = require('../middleware/vip');
const auth = require('../middleware/auth');

router.get('/find:id', async(req, res) => {
    const ticket = await TrainTicket.findById(req.params.id);
    if (!ticket) return res.status(404).send('The ticket with the given ID was not found.');

    res.send(ticket);
});

router.get('/including-vips', [auth, isVip], async(req, res) => {
    const tickets = await TrainTicket
        .find()
        .sort('price');
    res.send(tickets);
});

router.get('/without-vips', async(req, res) => {
    const tickets = await TrainTicket
        .find({isVip: false})
        .sort('price');
    res.send(tickets);
});

router.post('/', [auth, isAdmin], async(req , res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let ticket = new TrainTicket(_.pick(req.body, ['origin', 'destination', 'company', 'departureTime',
        'arrivalTime', 'trainNumber', 'station', 'price', 'quantity', 'isVip']));
    ticket = await ticket.save();

    res.send(ticket);
})

router.delete('/:id', [auth, isAdmin], async(req , res) => {
    const ticket = await TrainTicket.findByIdAndRemove(req.params.id);

    if (!ticket) return res.status(404).send('The ticket with the given ID was not found.');

    res.send(ticket);
})
// other handlers

module.exports = router;
