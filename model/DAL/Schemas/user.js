//database
const db = require('./model/DAL/helper');
const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var usersSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  friends: {type: Array},
  rooms: {type: Array}
});