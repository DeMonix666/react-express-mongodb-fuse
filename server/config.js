const passport = require('passport');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressSanitizer = require("express-sanitizer");
const helmet = require("helmet");
const requestIp = require("request-ip");
const rateLimit = require("express-rate-limit");
const cors = require('cors');
require("./dbconfig");

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
if(process.env.ENV !== "dev") {
    const limiter = rateLimit({
        windowMs: 60 * 1000,
        max: 200
    });

    app.use(limiter);
}

/**
 * Routing
 */
const users = require("./routes/users");
const items = require("./routes/items");
const test = require("./routes/test");

app.use("/api/users", users);
app.use("/api/items", items);
app.use("/api/test", test);

/**
 * Error handlers
 */
app.use((req, res, next) => {
    res.status(404);
    res.json({
        code: 0,
        message: "page not found"
    });
    return false;
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        code: 0,
        message: "system failed",
        result: error //error.message
    });
});

module.exports = app;