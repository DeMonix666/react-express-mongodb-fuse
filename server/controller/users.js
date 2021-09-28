const crypto = require("crypto");
const stringify = require("json-stable-stringify");
const { v4: uuidv4 } = require("uuid");
const helper = require("@helper");
const users = require("@model/users");

exports.register = async (req, res) => {
    let post = {
        username: req.sanitize(req.body.username),
        password: req.sanitize(req.body.password),
        status: 1,
        type: 1, // default admin type
        created_at: helper.timestamp(),
        token: null
    }

    let isPostEmpty = {
        username: post.username,
        password: post.password,
    }

    if (!await helper.isPostEmpty(res, isPostEmpty)) {
        return false;
    }

    let user = await users.findUsername(post.username);
    if(user){
        return helper.error(res, 'Username already exists');
    }

    post.password = crypto.createHmac('sha256', process.env.CRYPTR).update((post.password).toString()).digest('hex');
    post.token = uuidv4();

    user = await users.update(post);

    if(!user){
        return helper.error(res, 'Something went wrong');
    } else {
        user = await users.findUsername(post.username);
        
        return helper.success(res, 'Successfully registered', user, {
            token: post.token
        });
    }
}

exports.login = async (req, res) => {
    let post = {
        username: req.sanitize(req.body.username),
        password: req.sanitize(req.body.password)        
    }

    let isPostEmpty = {
        username: post.username,
        password: post.password,
    }

    if (!await helper.isPostEmpty(res, isPostEmpty)) {
        return false;
    }

    const user = await users.findUsername(post.username);
    if(!user){
        return helper.error(res, 'Invalid username or password');
    }

    const password = crypto.createHmac('sha256', process.env.CRYPTR).update((post.password).toString()).digest('hex');

    if(password != user.password){
        return helper.error(res, 'Invalid password');
    }

    const token = uuidv4();

    let result = await users.update({
        username: post.username,
        token: token,
        login_at: helper.timestamp(),
    });

    return helper.success(res, 'Successfully login', user, {
        token: token
    });
}

exports.refreshtoken = async (req, res) => {
    const token = uuidv4();

    const user = await users.update({
        username: req.user.username,
        token: token
    });

    return helper.success(res, '', req.user, {
        token: token
    });
};

exports.validate = async(req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization == undefined){
        return helper.error(res, 'Permission denied');
    }

    const token = req.headers.authorization.toString().replace('Bearer ','');

    let user = await users.findByToken(token);
    if(!user){
        return helper.error(res, 'Permission denied');
    }

    req.user = user;
    next();
}

exports.profile = async (req, res) => {
    return helper.success(res, '', req.user);
}

exports.detailsbyid = async (req, res) => {
    const id = req.sanitize(req.body.id);

    let user = await users.findById(id);
    if(!user){
        return helper.error(res, 'User not found');
    }

    return helper.success(res, '', user);
}

exports.logout = async (req, res) => {
    let result = await users.update({
        username: req.user.username,
        token: null
    });

    return helper.success(res, 'Successfully logout');
}

exports.list = async (req, res) => {
    let page = req.sanitize(req.body.page);
    if (page == undefined) page = 0;

    let result = await users.list(page);

    return helper.success(res, '', result);
}