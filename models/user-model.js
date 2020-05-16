const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const userSchema= new Schema({
  username:String,
  password:String,
  email:String,
  FirstName:String,
  LastName:String,
  googleId:String,
  thumbnail:String
});

const User= mongoose.model('user',userSchema);

module.exports = User
