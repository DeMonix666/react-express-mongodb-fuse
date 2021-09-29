const express = require("express");
const router = express.Router();

const users = require("@controller/users");
const transactions = require("@controller/transactions");

router.post("/pay", users.validate, transactions.pay);
router.post("/list", users.validate, transactions.list);
router.post("/mylist", users.validate, transactions.mylist);

module.exports = router;
