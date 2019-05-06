const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
const { getCurrencies } = require('./helpers/apiHelpers')
const items = require('../data/mongo');

var app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(express.static(__dirname + '../client/dist'));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

app.get('/currencies', (req, res) => {
  getCurrencies((err, results) => {
    if (err) {
      console.log(`Error retrieving list of currencies --> ${err}`);
      res.sendStatus(500);
    } else {
      res.send(results.data.symbols);
    }
  });
});

