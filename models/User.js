const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emergencyContactOne: { type: String, required: true },
  emergencyContactTwo: { type: String, required: true },
  emergencyContactThree: { type: String, required: true },
  emergencyContactFour: { type: String, required: true },
  emergencyContactFive: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);