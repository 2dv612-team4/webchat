'use strict';

const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  friends: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  ],
  rooms: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'room' },
  ],
});

let Model = mongoose.model('user', userSchema);

module.exports = Model;