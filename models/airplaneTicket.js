const Joi = require('joi');
const mongoose = require('mongoose');
const {date, number} = require("joi");

const airplaneTicketSchema = new mongoose.Schema({
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
        type: Date, // it will change
        required: true
    },
    arrivalTime:{
        type: Date, //it will change
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
    },
    price: {
        type: Number,
        required: true,
        min: 10,
        max: 500
    },
    quantity: {
        type: Number,
        default: 50,
        min: 1
    },
    isVip: {
        type: Boolean,
        default: false
    }
});
const AirplaneTicket = mongoose.model('AirplaneTicket', airplaneTicketSchema);
function validateAirplaneTicket(user) {
    const schema = Joi.object({
        origin: Joi.string().min(2).max(50).required(),
        destination: Joi.string().min(2).max(50).required().email(),
        airLine: Joi.string().min(2).max(50).required(),
        departureTime: date().required(),
        arrivalTime: date().required(),
        flightNumber: number().min(0).max(1000).required(),
        terminal: Joi.string().min(2).max(50).required(),
        price: Joi.number().min(10).max(500).required(),
        quantity: Joi.number().min(1),
        isVip: Joi.boolean()
    });
    return schema.validate(user);
}

exports.AirplaneTicket = AirplaneTicket;
exports.validate = validateAirplaneTicket;