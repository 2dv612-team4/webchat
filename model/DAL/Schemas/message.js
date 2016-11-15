'use strict';

const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let messageSchema = new Schema({
  userID: {type: String, required: true}, //need to use ref (foreign keys) instead of strings
  roomID: {type: String, required: true},
  message: {type: String, required: true},
  timestamp: {type: Date},
});

let Model = mongoose.model('message', messageSchema);

module.exports = Model;