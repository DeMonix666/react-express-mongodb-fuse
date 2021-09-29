const crypto = require("crypto");
const stringify = require("json-stable-stringify");
const { v4: uuidv4 } = require("uuid");
const helper = require("@helper");
const items = require("@model/items");

exports.save = async (req, res) => {
    let post = {
        _id: req.sanitize(req.body._id),
        name: req.sanitize(req.body.name),
        price: req.sanitize(req.body.price),
        quantity: req.sanitize(req.body.quantity),
        status: 1,
        created_at: helper.timestamp()
    }

    let isPostEmpty = {
        name: post.name,
        price: post.price,
        quantity: post.quantity
    }

    if (!await helper.isPostEmpty(res, isPostEmpty)) {
        return false;
    }

    let item = await items.findByName(post.name);
    console.log(post);
    console.log(item);
    if(item && post._id && item._id != post._id){
        return helper.error(res, 'Item already exists');
    }

    item = await items.update(post);

    if(!item){
        return helper.error(res, 'Something went wrong');
    } else {
        item = await items.findByName(post.name);
        
        return helper.success(res, 'Successfully saved', item);
    }
}

exports.detailsbyid = async (req, res) => {
    const id = req.sanitize(req.body.id);

    console.log(req.body);
    

    let item = await items.findById(id);
    if(!item){
        return helper.error(res, 'Item not found');
    }

    return helper.success(res, '', item);
}

exports.list = async (req, res) => {
    let page = req.sanitize(req.body.page);
    let limit = req.sanitize(req.body.limit);

    if (page == undefined)  page = 0;
    if (limit == undefined)  limit = 10;

    let result = await items.list(parseInt(page), parseInt(limit));

    return helper.success(res, '', result);
}