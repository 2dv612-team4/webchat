'use strict';

const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  friends: {type: Array},
  rooms: {type: Array},
});

let Model = mongoose.model('user', userSchema);

module.exports = Model;