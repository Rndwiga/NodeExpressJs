require('dotenv').config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

console.log('We are listening on port: ' + port);

server.listen(port);
server.timeout = 1000;

