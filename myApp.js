let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

// ✅ Middleware to parse urlencoded data from POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// ✅ Root-level request logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// ✅ Serve static assets from /public
app.use('/public', express.static(__dirname + '/public'));

// ✅ Serve HTML on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// ✅ Serve JSON with environment variable logic
app.get('/json', (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

// ✅ Chained middleware to add current time
app.get('/now', 
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  }, 
  (req, res) => {
    res.json({ time: req.time });
  }
);

// ✅ Route parameter example
app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

// ✅ GET and POST handler for /name
app.route('/name')
  .get((req, res) => {
    const { first, last } = req.query;
    res.json({ name: `${first} ${last}` });
  })
  .post((req, res) => {
    const { first, last } = req.body;
    res.json({ name: `${first} ${last}` });
  });

// ✅ Debug log
console.log("Hello World");

module.exports = app;
