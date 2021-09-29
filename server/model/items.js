const mongoose = require("mongoose");
const {conn} = require.main.require('./dbconfig');
const helper = require("@helper");

const ItemsSchema = mongoose.Schema(
  {
    name: {type: String, require: true, default: null},
    quantity: {type: Number, require: true, default: null},
    status: {type: Number, require: true, default: 1},
    price: {type: Number, require: true, default: 1},
    created_at: {type: String, require: true, default: null}
  },
  {
    versionKey: false
  }
);

const defaultReturn = {
    _id: 1,
    name: 1,
    quantity: 1,
    price: 1,
    status: 1,
    created_at: 1
};

ItemsSchema.index({name: 1}, {unique: 1});
const Items = conn.model("Items", ItemsSchema);

exports.findByName = async (name) => {
    return await Items.findOne({
        name: name
    }, 
        defaultReturn
    )
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
    return await Items.findOne({
            _id: _id
        }, 
        defaultReturn
    )
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
    return await Items.findOne({
            token: token
        }, 
        defaultReturn
    )
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
    const query = (post._id && post._id != 'new') ? { _id: post._id } : { name: post.name };

    delete(post['_id']);

    console.log(query);

    return await Items.updateOne(query, {
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
    return await Items.deleteOne({
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
    name: post.name
  }

  return await Items.find(query, {
    quantity: 0
  })
  .limit(10)
  .sort({
    name: 1
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

    console.log(pageLimit);
    return await Items.aggregate([
        // {
        //     $project: {
        //     }
        // },
        {
            $sort: {
                name: 1
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
