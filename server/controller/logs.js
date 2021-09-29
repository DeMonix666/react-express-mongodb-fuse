const crypto = require("crypto");
const stringify = require("json-stable-stringify");
const { v4: uuidv4 } = require("uuid");
const helper = require("@helper");
const logs = require("@model/logs");

exports.list = async (req, res) => {
    let page = req.sanitize(req.body.page);
    let limit = req.sanitize(req.body.limit);

    if (page == undefined)  page = 0;
    if (limit == undefined)  limit = 100;

    let result = await logs.list(parseInt(page), parseInt(limit));

    return helper.success(res, '', result);
}