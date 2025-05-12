let express = require('express');
let app = express();
let path = require('path');
require('dotenv').config(); // Load environment variables

// 🔍 Root-level logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next(); // Move to the next middleware or route handler
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

// Debugging log
console.log("Hello World");

module.exports = app;
