const express = require('express');
const auth = require('../middleware/auth');
const {User} = require("../models/user");
const {AirplaneTicket} = require('../models/airplaneTicket');
const Fawn = require('fawn');
const _ = require("lodash");
const router = express.Router();

Fawn.init("mongodb://localhost/online-reservation");
router.post('/:ticketId', auth, async(req, res) => {
    let user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(400).send('Invalid user.');

    let ticket = await AirplaneTicket.findOne({ _id: req.params.ticketId })
    if (!ticket) return res.status(400).send('Invalid ticket.');

    ticket = await AirplaneTicket.findByIdAndUpdate(ticket._id, {
        $inc: { quantity: -1 }
    })
    user.airplaneTickets.push(_.omit(ticket, ['_id', 'quantity']));
    user = await user.save();
    res.send(user);

    // try {
    //     new Fawn.Task()
    //         .update('airplaneTickets', { _id: ticket._id }, {
    //             $inc: {quantity: -1}
    //         })
    //         .save('users', user)
    //         .run();
    //
    //     res.send(user);
    // }
    // catch(ex) {
    //     console.log(ex);
    //     res.status(500).send('Something failed while buying ticket.');
    // }
});

module.exports = router;