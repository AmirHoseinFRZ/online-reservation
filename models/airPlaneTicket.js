const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const {date, number} = require("joi");

const airPlaneTicketSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    destination: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    airLine: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime:{
        type: Date,
        required: true
    },
    flightNumber:{
        type: Number,
        required: true,
        min: 0,
        max: 1000
    },
    terminal: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    }
});

const AirPlaneTicket = mongoose.model('User', airPlaneTicketSchema);
function validateAirPlaneTicket(user) {
    const schema = Joi.object({
        origin: Joi.string().min(2).max(50).required(),
        destination: Joi.string().min(2).max(50).required().email(),
        airLine: Joi.string().min(2).max(50).required(),
        departureTime: date().required(),
        arrivalTime: date().required(),
        flightNumber: number().min(0).max(1000).required(),
        terminal: Joi.string().min(2).max(50).required()
    });
    return schema.validate(user);
}

exports.User = AirPlaneTicket;
exports.validate = validateAirPlaneTicket;