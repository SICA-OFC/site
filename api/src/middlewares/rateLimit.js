const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-8', // draft-6: RateLimit-* headers; draft-7 & draft-8: combined RateLimit header
    legacyHeaders: false, // Disable the X-RateLimit-* headers.
    // store: ... , // Redis, Memcached, etc. See below.
});

module.exports = limiter;