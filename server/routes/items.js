const express = require("express");
const router = express.Router();

const users = require("@controller/users");
const items = require("@controller/items");

router.post("/save", users.validate, items.save);
router.get("/list", users.validate, items.list);
router.post("/list", users.validate, items.list);
router.get("/detailsbyid", users.validate, items.detailsbyid);
router.post("/detailsbyid", users.validate, items.detailsbyid);
module.exports = router;
