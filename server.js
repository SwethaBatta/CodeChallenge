const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(config.db, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');

app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger('dev'));

app.use("/", require("./routes/file"));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = 3001;
app.listen(port);
console.log(`Server is running on port: ${port}`);
