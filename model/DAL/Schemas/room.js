'use strict';

const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let roomSchema = new Schema({
  name: {type: String, required: true},
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ],
  timestamp: {type: Date},
});

let Model = mongoose.model('room', roomSchema);

module.exports = Model;