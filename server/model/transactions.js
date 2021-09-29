const mongoose = require("mongoose");
const {conn} = require.main.require('./dbconfig');
const helper = require("@helper");

const TransactionsSchema = mongoose.Schema(
  {
    userid: {type: String, require: true, default: null},
    total: {type: Number, require: true, default: null},
    status: {type: Number, require: true, default: 1},
    created_at: {type: String, require: true, default: null},
    items: {type: Array, require: true, default: null}
  },
  {
    versionKey: false
  }
);

const defaultReturn = {
    _id: 1,
    userid: 1,
    total: 1,
    status:1,
    created_at:1,
    items: 1,
};

const Transactions = conn.model("Transactions", TransactionsSchema);

exports.update = async post => {
    return await Transactions.updateOne({
        created_at: post.created_at,
        userid: post.userid
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

exports.findById = async (_id) => {
    return await Transactions.findOne({
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

exports.list = async (userid = null, page, pageLimit = 10) => {
    if (!pageLimit) pageLimit = helper.pageLimit;
    let match = {};

    if (userid) {
        match = {
            userid: userid
        }
    }

        
    return await Transactions.aggregate([
        // {
        //     $project: {
        //     }
        // },
        {
            $match: match
        },
        {
            $sort: {
                created_at: -1
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
            value[0].pagination["pages"] = Math.ceil(
                value[0].pagination.total / pageLimit
            );
            value[0].pagination["page"] = page + 1;
            value[0].pagination["limit"] = pageLimit;

            return value[0];
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
