const express = require('express');
const auth = require('../middleware/auth');
const {User} = require("../models/user");
const {AirplaneTicket} = require('../models/trainTicket');
const Fawn = require('fawn');
const router = express.Router();

router.post('/:userId:ticketId', auth, async(req, res) => {
    let user = await User.findOne({ _id: req.params.userId });
    if (!user) return res.status(400).send('Invalid user.');

    const ticket = await AirplaneTicket.findOne({ _id: req.params.ticketId })
    if (!user) return res.status(400).send('Invalid ticket.');

    user.airplaneTickets.push(ticket);

    try {
        new Fawn.Task()
            .update('airplaneTickets', { _id: ticket._id }, {
                $inc: {quantity: -1}
            })
            .save('users', user)
            .delete('airplaneTickets', { _id: ticket._id, quantity: 0})
            .run();

        res.send(user);
    }
    catch(ex) {
        res.status(500).send('Something failed while buying ticket.');
    }
});

module.exports = router;