const crypto = require("crypto");
const stringify = require("json-stable-stringify");
const { v4: uuidv4 } = require("uuid");
const helper = require("@helper");
const transactions = require("@model/transactions");

exports.pay = async (req, res) => {
    let post = {
        items: JSON.parse(req.sanitize(req.body.items)),
        userid: req.user._id,
        total: req.sanitize(req.body.total),
        status: 1,
        created_at: helper.timestamp()
    }

    if (post.items.length == 0){
        return helper.error(res, 'No items found');
    }

    const result = await transactions.update(post);

    if(!result){
        return helper.error(res, 'Something went wrong');
    } else {
        const transaction = await transactions.findById(result.upsertedId);

        return helper.success(res, 'Successfully saved', transaction);
    }
}

exports.list = async (req, res) => {
    let page = req.sanitize(req.body.page);
    let limit = req.sanitize(req.body.limit);

    if (page == undefined)  page = 0;
    if (limit == undefined)  limit = 10;

    let result = await transactions.list(null, parseInt(page), parseInt(limit));

    return helper.success(res, '', result);
}

exports.mylist = async (req, res) => {
    let page = req.sanitize(req.body.page);
    let limit = req.sanitize(req.body.limit);

    if (page == undefined)  page = 0;
    if (limit == undefined)  limit = 10;

    let result = await transactions.list(req.user._id.toString(), parseInt(page), parseInt(limit));

    return helper.success(res, '', result);
}