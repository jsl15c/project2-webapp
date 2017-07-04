const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataSchema = new Schema ({
  label:{type:Array},
  score:{type:Array}
});

const DataModel = mongoose.model('Data', DataSchema);

module.exports = DataModel;
