const express = require('express');
const users = require('../routes/users')
// other routes
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use(error);
};

