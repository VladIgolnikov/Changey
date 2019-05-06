const { API_KEY } = require('../../config');
const axios = require('axios');

let getCurrencies = cb => {
  axios
    .get(`http://data.fixer.io/api/symbols`, {
      params: {
        access_key: API_KEY
      }
    })
    .then(response => cb(response))
    .catch(error => cb(error));
};

getCurrencies((results, err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(results.data.symbols);
  }
});

module.exports.getCurrencies = getCurrencies;
