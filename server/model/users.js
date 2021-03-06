const mongoose = require("mongoose");
const {conn} = require.main.require('./dbconfig');
const helper = require("@helper");

const UsersSchema = mongoose.Schema(
  {
    username: {type: String, require: true, default: null},
    password: {type: String, require: true, default: null},
    status: {type: Number, require: true, default: 1},
    type: {type: Number, require: true, default: 1},
    created_at: {type: String, require: true, default: null},

    /**
     * Access
     */
    token:  {type: String, require: false, default: null},
    login_at: {type: String, require: true, default: null}
  },
  {
    versionKey: false
  }
);

UsersSchema.index({username: 1}, {unique: 1});
const Users = conn.model("Users", UsersSchema);

exports.findUsername = async (username) => {
    return await Users.findOne({
        username: username
    }, 
    {
        _id: 1,
        username: 1,
        password: 1,
        type: 1,
        status: 1
    })
    .then(value => {
        if(value){
            return value;
        }
        return false;
    })
    .catch(err => {
        console.log(err);
        return false;
    });
}

exports.findById = async (_id) => {
    return await Users.findOne({
        _id: _id
    }, 
    {
        _id: 1,
        username: 1,
        password: 1,
        type: 1,        
        status: 1
    })
    .then(value => {
        if(value){
            return value;
        }
        return false;
    })
    .catch(err => {
        console.log(err);
        return false;
    });
}

exports.findByToken = async (token) => {
    return await Users.findOne({
        token: token
    }, 
    {
        _id: 1,
        username: 1,
        password: 1,
        type: 1,
        status: 1
    })
    .then(value => {
        if(value){
            return value;
        }
        return false;
    })
    .catch(err => {
        console.log(err);
        return false;
    });
}

exports.update = async post => {
    return await Users.updateOne({
        username: post.username
    },{
        $set: post
    },
    {
        upsert: true
    })
    .then(value => {
        if(value){
            return value;
        }
        return false;
    })
    .catch(err => {
        console.log(err);
        return false;
    })
}

exports.delete = async (_id) => {
    return await Users.deleteOne({
        _id: _id
    })
    .then(value => {
        if(value){
            return value;
        }
        return false;
    })
    .catch(err => {
        console.log(err);
        return false;
    })
}

exports.search = async post => {
  let query = {
    username: post.username
  }

  return await Users.find(query, {
    password: 0
  })
  .limit(10)
  .sort({
    username: 1
  })
  .then(value => {
    if(value.length >= 1){
      return value;
    }
    return false;
  })
  .catch(err => {
    console.log(err);
    return false;
  })
}

exports.list = async (page, pageLimit = 10) => {
    return await Users.aggregate([
        {
            $project: {
                password: 0
            }
        },
        {
            $sort: {
                username: 1
            }
        },
        {
            $group: {
                _id: 1,
                collection: {
                    $push: "$$ROOT"
                },
                total: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                collection: {
                    $slice: [
                        "$collection",
                        page * pageLimit,
                        pageLimit
                    ]
                },
                pagination: {
                    total: "$total"
                }
            }
        }
    ])
    .then(value => {
        if (value.length) {
            const temp = value[0];
            temp.pagination['pages'] = Math.ceil(temp.pagination.total / pageLimit);
            temp.pagination["limit"] = pageLimit;
            temp.pagination["page"] = page;

            return temp;
        } else {
            value = {
                collection: [],
                pagination: {
                    total: 0,
                    pages: 0,
                    page: 0,
                    limit: pageLimit
                }
            };
            return value;
        }
    })
    .catch(err => {
        console.log(err);
        return false;
    });
}
