const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
const { getCurrencies, getRates } = require('./helpers/apiHelpers');
const { addSaved, getSaved, deleteSaved } = require('../data/db');

let app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/../client/dist'));

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

app.get('/rates', (req, res) => {
  getRates((err, results) => {
    if (err) {
      console.log(`Error retrieving rates --> ${err}`);
      res.sendStatus(500);
    } else {
      res.send(results.data.rates);
    }
  });
});

app.get('/saved', (req, res) => {
  getSaved((err, results) => {
    if (err) {
      console.log(`Error getting saved currencies --> ${err}`);
      res.sendStatus(500);
    } else {
      console.log(`Got all saved --> ${results}`);
      res.send(results);
    }
  });
});

app.post('/saved', (req, res) => {
  addSaved(req.body.fx, (err, results) => {
    if (err) {
      console.log(`Error saving currency --> ${err}`);
      res.sendStatus(500);
    } else {
      console.log(`Saved fx`);
      res.sendStatus(201);
    }
  });
});

app.delete('/saved', (req, res) => {
  deleteSaved(req.body.fx, (err, results) => {
    if (err) {
      console.log(`Error deleting currency --> ${err}`);
      res.sendStatus(500);
    } else {
      console.log(`Deleted fx`);
      res.sendStatus(201);
    }
  });
});
