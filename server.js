// depedencies

const net = require('net');
const fs = require('fs');

// server up

const server = net.createServer();
const port = 8000;


// server listening event

server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

// client handling events

server.on('connection', (client) => {
  console.log('New client connected to server.');
  client.setEncoding('utf8'); // interpret data as text
  
  // welcome message 

  client.write('Welcome to my server!\n Please enter your desired filename.');

  // waiting for client data
  
  client.on('data', (file) => {
    file = file.replace(/\n/, ''); // avoids linebreaks
    fs.readFile(file, (error, contents) => {
      if (error) {
        client.write(`File not found! Please try again!`);
      } else {
        client.write(`File found! Content follows:\n${contents}`)
      }
    });
  });

  // error event handler
  
  client.on("error", function (error) {
    console.log(`Error message: ${error.message}`);
  });
  
  // on close event handler -> when a client disconnects

  client.on("close", function () {
    console.log("client is disconected.");
  });

  
});