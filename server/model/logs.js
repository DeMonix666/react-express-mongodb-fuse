const mongoose = require("mongoose");
const {conn} = require.main.require('./dbconfig');
const helper = require("@helper");

const LogsSchema = mongoose.Schema(
  {
    ip: {type: String, require: true, default: null},
    url: {type: String, require: true, default: null},
    type: {type: Number, require: true, default: 1},
    created_at: {type: String, require: true, default: null}
  },
  {
    versionKey: false
  }
);

const defaultReturn = {
    _id: 1,
    ip: 1,
    type:1,
    created_at: 1
};

const Logs = conn.model("Logs", LogsSchema);

exports.update = async post => {
    return await Logs.updateOne({
        created_at: post.created_at,
        ip: post.ip,
        type: post.type
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

exports.list = async (page) => {
    return await Logs.aggregate([
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
                        page * helper.pageLimit,
                        helper.pageLimit
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
                value[0].pagination.total / helper.pageLimit
            );
            value[0].pagination["page"] = page + 1;
            value[0].pagination["limit"] = helper.pageLimit;

            return value[0];
        } else {
            value = {
                collection: [],
                pagination: {
                    total: 0,
                    pages: 0,
                    page: 0,
                    limit: helper.pageLimit
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
