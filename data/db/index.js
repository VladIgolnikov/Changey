const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/changey', {
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', () => {
  console.log('Mongoose connection error');
});

db.once('open', () => {
  console.log('Mongoose connected');
});

var SaveFxSchema = mongoose.Schema({
  User: { type: String, default: 1 },
  Currency: String
});

var SaveFx = mongoose.model('SaveFx', SaveFxSchema);

var addSaved = (fx, callback) => {
  SaveFx.create({ Currency: fx }, (err, status) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, status);
    }
  });
};

var getSaved = callback => {
  SaveFx.find({ User: 1 }, 'Currency -_id', (err, items) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, (items));
    }
  });
};

var deleteSaved = (fx, callback) => {
  SaveFx.deleteOne({ User: 1, Currency: fx }, (err, status) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, status);
    }
  });
};

module.exports.addSaved = addSaved;
module.exports.getSaved = getSaved;
module.exports.deleteSaved = deleteSaved;