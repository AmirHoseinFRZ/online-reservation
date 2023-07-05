const express = require('express');
// other routes
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    // load other routes
    app.use(error);
};

