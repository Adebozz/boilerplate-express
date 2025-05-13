let express = require('express');
let app = express();
let path = require('path');
require('dotenv').config(); // Load environment variables

// Root-level logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Serve static assets from the /public directory
app.use('/public', express.static(__dirname + '/public'));

// Route to send HTML file
app.get('/', (req, res) => {
  let absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

// Route to serve JSON data with optional uppercase
app.get('/json', (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

// Route to serve current time using chained middleware
app.get('/now', 
  function(req, res, next) {
    req.time = new Date().toString();
    next();
  }, 
  function(req, res) {
    res.json({ time: req.time });
  }
);

// ✅ Echo route using route parameter
app.get('/:word/echo', (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

// Console log for debugging
console.log("Hello World");

module.exports = app;
