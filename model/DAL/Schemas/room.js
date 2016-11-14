'use strict';

const db = require('../helper');
const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var roomSchema = new Schema({
  name: {type: String, required: true},
  users: {type: Array, required: true},
  timestamp: {type: Date}
});

var Model = mongoose.model('room', roomSchema);

module.exports = Model;