const airplaneTicketSchema = require('../models/airplaneTicket').airplaneTicketSchema;
const trainTicketSchema = require('../models/trainTicket').trainTicketSchema;
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    airplaneTickets: [airplaneTicketSchema],
    trainTickets: [trainTicketSchema],
    isVip: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({_id: this._id, isVip: this.isVip, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        airplaneTickets: Joi.ObjectId(),
        trainTickets: Joi.ObjectId(),
        isVip: Joi.boolean(),
        isAdmin: Joi.boolean()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;