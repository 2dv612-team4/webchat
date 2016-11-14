'use strict';
//database
const db = require('../helper');
const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  friends: {type: Array},
  rooms: {type: Array}
});

var Model = mongoose.model('user', userSchema);

module.exports = Model;