const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataModel = require('./data-model.js');

const UserSchema = new Schema({
  firstName:{type:String},
  lastName:{type:String},

  email:{type:String},

  // SIGN UP/LOGIN FORM users
  encryptedPassword:{type:String},

  // GOOGLE users
  googleId:{type:String},

  // FACEBOOK users
  facebookId:{type:String},

  data:[DataModel.schema]
},
{
  timestamps:true
}
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
