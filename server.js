// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// Start up an instance of app
const app = express();
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

// Setup Server
const port = 8888;
const host = 'localhost';
app.listen(port, () => console.log(`Connect in ${host}:${port}`));

app.get('/all', (req, res) => {
  return res.send(projectData);
});
app.post('/add', (req, res) => {
  projectData = req.body;
  res.send({
    message: 'saved',
  });
});
