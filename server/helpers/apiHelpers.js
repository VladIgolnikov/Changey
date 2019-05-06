const { API_KEY } = require('../../config');
const Axios = require('axios');

let getCurrencies = cb => {
  Axios
    .get('http://data.fixer.io/api/symbols', {
      params: {
        access_key: API_KEY
      }
    })
    .then(response => cb(response))
    .catch(error => cb(error));
};

let getRates = (base, symbols, cb) => {
  Axios.get('http://data.fixer.io/api/latest', {
    params: {
      access_key: API_KEY,
      base: base,
      symbols: symbols
    }
  })
  .then(response => cb(response.rates))
  .catch(error => cb(error));
};


module.exports.getCurrencies = getCurrencies;
module.exports.getRates = getRates;
