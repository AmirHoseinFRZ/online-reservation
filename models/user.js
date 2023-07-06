const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({});

userSchema.methods.generateAuthToken = function() {}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {};
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;