const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
const {User, profileValidate, passwordValidate} = require("../models/user");
const Joi = require("joi");
const router = express.Router();

router.put('/', auth, async (req, res) => {
    const { error } = profileValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.user._id, _.pick(req.body, ['name', 'ID', 'lastName', 'phone', 'age', 'sex'])
        , { new: true });

    res.send(user)
})

router.put('/change-password', auth, async (req, res) => {
    const { error } = passwordValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.user._id, _.pick(req.body, ['password'])
        , { new: true });

    res.send(user);
})

module.exports = router;