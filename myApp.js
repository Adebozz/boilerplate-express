let express = require('express');
let app = express();
let path = require('path');

// Route to send HTML file
app.get('/', (req, res) => {
  let absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

// console.log for debugging
console.log("Hello World");

module.exports = app;
