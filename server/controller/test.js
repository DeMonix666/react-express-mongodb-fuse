const helper = require("@helper");

exports.details = async (req, res) => {
	return helper.success(res, 'Test data', { dummy: 'Oh Yeah!'});
}