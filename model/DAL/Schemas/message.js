'use strict';

const db = require('../helper');
const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var messageSchema = new Schema({
  userID: {type: String, required: true}, //need to use ref (foreign keys) instead of strings
  roomID: {type: String, required: true},
  message: {type: String, required: true},
  timestamp: {type: Date}
});

var Model = mongoose.model('message', messageSchema);

module.exports = Model;