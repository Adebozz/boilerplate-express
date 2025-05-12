let express = require('express');
let app = express();
let path = require('path');

// Mount express.static middleware to serve static assets from /public
app.use('/public', express.static(__dirname + '/public'));

// Route to send HTML file
app.get('/', (req, res) => {
  let absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

// console.log for debugging
console.log("Hello World");

module.exports = app;
