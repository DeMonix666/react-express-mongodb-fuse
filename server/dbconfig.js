const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useUnifiedTopology', true);

const conn  = mongoose.createConnection(process.env.MONGODB, {
    useNewUrlParser: true
});
exports.conn  = conn ;
