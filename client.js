// depedencies

const net = require('net');
const port = 8000;
const client = net.createConnection({
  port: port,
  host: 'localhost',
});

client.setEncoding('utf8'); // encode messages as text

// event handlers for client

// event handler for connection

client.on('connect', function () {
  console.log('Connected successfully to server!');
});

// event handle for receiving incoming messages from server

client.on('data', function (message) {
  console.log(message);
});

// event handler for error

client.on('error', function (error) {
  console.log(`Error: ${error.message}`);
});

// event handler for disconnection

client.on("end", function () {
  console.log('Disconnected from server!');
  process.exit();
});

// file name input 

process.stdin.on('data', function (fileName) {
  client.write(fileName);
});