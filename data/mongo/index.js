const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/changey');

var db = mongoose.connection;

db.on('error', function() {
  console.log('Mongoose connection error');
});

db.once('open', function() {
  console.log('Mongoose connected');
});

var saveFxSchema = mongoose.Schema({
  User: String,
  Currency: String
});

var saveFx = mongoose.model('SaveFx', saveFxSchema);

var selectAll = callback => {
  saveFx.find({}, function(err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
