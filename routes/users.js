const auth = require('../middleware/auth');
const user = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {}); // authorization

router.post('/', async (req, res) => { }); // authentication

module.exports = router;
