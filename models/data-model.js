const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataSchema = new Schema ({
  label:{type:String},
  score:{type:Number}
});

const DataModel = mongoose.model('Data', DataSchema);

module.exports = DataModel;
