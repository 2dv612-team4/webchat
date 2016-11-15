'use strict';

const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let messageSchema = new Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  roomID: {type: mongoose.Schema.Types.ObjectId, ref: 'room', required: true},
  message: {type: String, required: true},
  timestamp: {type: Date},
});

let Model = mongoose.model('message', messageSchema);

module.exports = Model;