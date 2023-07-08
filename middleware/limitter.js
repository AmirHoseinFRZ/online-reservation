const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 10, // limit each IP to 10 requests per window
    message: 'Too many requests from this IP, please try again later'
});