const airplaneTicketSchema = require('../models/airplaneTicket').airplaneTicketSchema;
const trainTicketSchema = require('../models/trainTicket').trainTicketSchema;
const hotelRoomSchema = require('../models/hotelRoom').hotelRoomSchema
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
    reservedRooms: [hotelRoomSchema],
    isVip: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    ID: {
        type: Number,
        min: 0
    },
    lastName: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        length: 11,
        pattern: /^[0-9]+$/
    },
    sex: {
        type: String,
        enum: ['male', 'female']
    },
    age: {
        type: Number,
        min: 8,
        max: 100
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
        airplaneTickets: Joi.forbidden(),
        trainTickets: Joi.forbidden(),
        reservedRooms: Joi.forbidden(),
        isVip: Joi.forbidden(),
        isAdmin: Joi.forbidden(),
        ID: Joi.number().min(0),
        lastName: Joi.string().min(5).max(50),
        phone: Joi.string().min(11).max(11).pattern(/^[0-9]+$/),
        age: Joi.number().min(8).max(100),
        sex: Joi.string().valid('male', 'female')
    });
    return schema.validate(user);
}

function profileValidate(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        ID: Joi.number().min(0),
        lastName: Joi.string().min(5).max(50),
        phone: Joi.string().min(11).max(11).pattern(/^[0-9]+$/),
        age: Joi.number().min(8).max(100),
        sex: Joi.string().valid('male', 'female')
    });
    return schema.validate(user);
}

function passwordValidate(user) {
    const schema = Joi.object({
        password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(user);
}

function signInValidate(user){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
module.exports.profileValidate = profileValidate;
module.exports.passwordValidate = passwordValidate;
module.exports.signInValidate = signInValidate;