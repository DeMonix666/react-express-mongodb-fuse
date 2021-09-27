require('module-alias/register');
require('dotenv/config');

const fs = require('fs');
const http = require('http');
const config = require('./config');
const server = http.createServer(config);
server.listen(process.env.PORT);
console.log(`Server is listening to port ${process.env.PORT} - ${new Date().toISOString()}`);
