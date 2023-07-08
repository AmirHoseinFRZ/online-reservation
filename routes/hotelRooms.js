const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {HotelRoom, validate} = require('../models/hotelRoom');
const isAdmin = require('../middleware/admin');
const isVip = require('../middleware/vip');
const auth = require('../middleware/auth');


router.get('/search', auth,async(req, res) => {
    const tickets = await HotelRoom
        .find({entryDate: req.body.arrivalTime,
            departureDate: req.body.departureTime,
            city: req.body.city,
            capacity: { $gte: req.body.passengers}}) // default of passenger is 1 when user didn't choose it
    if (!tickets) return res.status(404).send('The ticket with the given ID was not found.');

    res.send(tickets);
});
router.get('/find:id', async(req, res) => {
    const room = await HotelRoom.findById(req.params.id);
    if (!room) return res.status(404).send('The room with the given ID was not found.');

    res.send(room);
});

router.get('/including-vips', [auth, isVip], async(req, res) => {
    const rooms = await HotelRoom
        .find()
        .sort('price');
    res.send(rooms);
});

router.get('/without-vips', async(req, res) => {
    const rooms = await HotelRoom
        .find({isVip: false})
        .sort('price');
    res.send(rooms);
});

router.post('/', [auth, isAdmin], async(req , res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let room = new HotelRoom(_.pick(req.body, ['hotelName', 'roomNumber', 'city', 'capacity',
                                            'entryDate', 'departureDate', 'numberOfBeds', 'isVip']));
    room = await room.save();

    res.send(room);
})

router.delete('/:id', [auth, isAdmin], async(req , res) => {
    const room = await HotelRoom.findByIdAndRemove(req.params.id);

    if (!room) return res.status(404).send('The room with the given ID was not found.');

    res.send(room);
})
// other handlers

module.exports = router;
