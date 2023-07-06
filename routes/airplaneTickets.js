const express = require('express');
const router = express.Router();
const {AirplaneTicket, validate} = require('../models/airplaneTicket');
const auth = require('../middleware/auth');

router.get('/', auth, async(req, res) => {
    const tickets = await AirplaneTicket.find();
    res.send(tickets);
})
