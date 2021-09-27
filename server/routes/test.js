const express = require("express");
const router = express.Router();

const test = require("@controller/test");

router.get("/details", test.details);
module.exports = router;
