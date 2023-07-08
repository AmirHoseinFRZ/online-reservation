const express = require('express');
const auth = require('../middleware/auth');
const {User} = require("../models/user");
const {HotelRoom} = require('../models/hotelRoom');
const Fawn = require('fawn');
const router = express.Router();

router.post('/:userId/:roomId', auth, async(req, res) => {
    let user = await User.findOne({ _id: req.params.userId });
    if (!user) return res.status(400).send('Invalid user.');

    const room = await HotelRoom.findOne({ _id: req.params.roomId })
    if (!user) return res.status(400).send('Invalid room.');

    user.reservedRooms.push(room);

    try {
        new Fawn.Task()
            .save('users', user)
            .delete('hotelRooms', { _id: room._id })
            .run();

        res.send(user);
    }
    catch(ex) {
        res.status(500).send('Something failed while reserving room.');
    }
});

module.exports = router;