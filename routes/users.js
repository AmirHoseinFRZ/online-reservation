const auth = require('../middleware/auth');
const {User, validate, signInValidate} = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minute window
    max: 5, // limit each IP to 5 attempts per window
    message: 'Too many login attempts from this IP, please try again later'
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/sign-up', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isVip', 'isAdmin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
}); // authentication (sign-up)

router.post('/sign-in', limiter, async (req, res) => {
    const { error } = signInValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    req.rateLimit.reset();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
})

module.exports = router;
