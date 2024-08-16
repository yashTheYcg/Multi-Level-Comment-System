const { rateLimit } = require('express-rate-limit');


const commentRateLimitation = rateLimit({
    windowMs: 1 * 60 * 1000, // 5 minutes
    limit: 2, // Limit each IP to 100 requests per `window`
    message: "Please wait for my 5 minutes",
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false,
    // store: ... , // Use an external store for more precise rate limiting
})


const replyCommentRateLimitation = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "Please wait for my 5 minutes",
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false,
    // store: ... , // Use an external store for more precise rate limiting
})


module.exports = { commentRateLimitation, replyCommentRateLimitation }




