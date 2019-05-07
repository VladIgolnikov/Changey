const { API_KEY } = require('../../config');
const Axios = require('axios');

let getCurrencies = cb => {
  Axios
    .get('http://data.fixer.io/api/symbols', {
      params: {
        access_key: API_KEY
      }
    })
    .then(response => cb(null, response))
    .catch(error => cb(error));
};

let getRates = (cb) => {
  Axios.get('http://data.fixer.io/api/latest', {
    params: {
      access_key: API_KEY,
    }
  })
  .then(response => cb(null, response))
  .catch(error => cb(error));
};


module.exports.getCurrencies = getCurrencies;
module.exports.getRates = getRates;
