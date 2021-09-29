const passport = require('passport');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressSanitizer = require("express-sanitizer");
const helmet = require("helmet");
const requestIp = require("request-ip");
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const helper = require("@helper");

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(helmet());
app.use(expressSanitizer());
app.use(requestIp.mw());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: false
}));

/**
 * Request Limiter
 */
const limiter = rateLimit({
    windowMs: process.env.MAX_REQUEST_TIMELIMIT * 60 * 1000,
    max: process.env.MAX_REQUEST_LIMIT,
    handler: async (req, res) => {
        const msg = 'You sent too many requests. Please wait a while then try again';

        helper.addLog(req, 2, msg);

        return res.status(200).json({
            code: 0,
            message: msg
        })
    }
    // message: {
    //     code: 0,
    //     message: "Too many requests from this IP, please try again after an hour"
    // }
});

const logRequest = async(req, res, next) => {
    const ip = req.clientIp;

    helper.addLog(req, 1, '');

    next();
}

/**
 * Routing
 */
const users = require("./routes/users");
const items = require("./routes/items");
const logs = require("./routes/logs");
const transactions = require("./routes/transactions");
const test = require("./routes/test");

app.use("/api/users", logRequest, limiter, users);
app.use("/api/items", logRequest, limiter, items);
app.use("/api/logs", logRequest, limiter, logs);
app.use("/api/transactions", logRequest, limiter, transactions);
app.use("/api/test", logRequest, limiter, test);

/**
 * Error handlers
 */
app.use((req, res, next) => {
    const msg = 'page not found';
    helper.addLog(req, 2, msg);

    res.status(200);
    res.json({
        code: 0,
        message: msg
    });
    return false;
});

app.use((error, req, res, next) => {
    const msg = 'system failed';
    helper.addLog(req, 2, msg);

    res.status(error.status || 500);

    res.json({
        code: 0,
        message: msg,
        result: error //error.message
    });
});

module.exports = app;