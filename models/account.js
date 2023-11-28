const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = new mongoose.Schema({
  username: String,
  password: String
});

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);
