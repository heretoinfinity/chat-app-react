const { createServer } = require('http'); //in Node
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');  // in Node

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000); //default,on port 5000

const app = express();
const dev = app.get('env') !== 'production'

if(!dev) { // if not in dev environment
  app.disable('x-powered-by')
  app.use(compression()) // compression the server
  app.use(morgan('common')) // log the output of requests

  // Serve static files from the React app
  app.use(express.static(path.resolve(__dirname, 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build','index.html'));
  });
}

if (dev) {
  app.use(morgan('dev'))
}

const server = createServer(app);

server.listen(PORT, err => {
  if (err) throw err;

  console.log('Server started!')
});

