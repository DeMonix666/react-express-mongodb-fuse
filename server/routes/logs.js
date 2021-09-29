const express = require("express");
const router = express.Router();

const users = require("@controller/users");
const logs = require("@controller/logs");

router.post("/list", users.validate, logs.list);
module.exports = router;
