const express = require("express");
const router = express.Router();

const users = require("@controller/users");

router.post("/register", users.register);
router.post("/login", users.login);
router.get("/profile", users.validate, users.profile);
router.get("/detailsbyid", users.validate, users.detailsbyid);
router.get("/list", users.validate, users.list);
router.get("/refreshtoken", users.validate, users.refreshtoken);
router.post("/logout", users.validate, users.logout);
module.exports = router;
