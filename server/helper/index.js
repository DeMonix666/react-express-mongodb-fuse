const validator = require("validator");
const date = require("date-and-time");

exports.timestamp = () => {
    return date.format(date.addDays(new Date(), 0), "YYYY-MM-DD HH:mm:ss");
};

exports.isPostEmpty = async (res, data) => {
    let errorFields = [];

    for (let key in data) {
        let value = data[key];

        if (!value || !value.length || value == undefined) {
            let error = {};
            error[key] = `${key} cannot be blank`;
            errorFields.push(error);
        }
    }
    
    if (errorFields.length > 0){
        res.json({
            code: 0,
            errorFields: errorFields 
        });

        return false;
    } else {
        return true;
    }
};

exports.error = (res, message) => {
    res.json({
        code: 0,
        message: message 
    });

    return false;
}

exports.success = (res, message, data = {}, extraData={}) => {
    let response = {
        code: 1,
        message: message
    };

    if (Object.keys(data).length){
        response['data'] = data;
    }

    if (Object.keys(extraData).length > 0){
        for (let key in extraData) {
            let value = extraData[key];

            response[key] = value;
        }
    }

    res.json(response);

    return true;
}