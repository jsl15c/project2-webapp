const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataSchema = new Schema ({
  entry:{type:String},
  label:{type:String},
  score:{type:Number},
  date:{type:String}
});

const DataModel = mongoose.model('Data', DataSchema);

module.exports = DataModel;
