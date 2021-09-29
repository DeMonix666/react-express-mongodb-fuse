const crypto = require("crypto");
const stringify = require("json-stable-stringify");
const { v4: uuidv4 } = require("uuid");
const helper = require("@helper");
const logs = require("@model/logs");

exports.list = async (req, res) => {
    let page = req.sanitize(req.body.page);
    if (page == undefined)  page = 1;

    let result = await logs.list(page - 1, 100);

    return helper.success(res, '', result);
}