const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let messageSchema = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  message: {type: String, required: true},
  timestamp: {type: Date, default: Date.now, required: true},
  createdAt: {type: Date, default: Date.now, expires: '30d'}
});

let roomSchema = new Schema({
  name: {type: String, required: true},
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  ],
  messages: [messageSchema],
  timestamp: {type: Date, default: Date.now, required: true},
});

let Model = mongoose.model('room', roomSchema);

module.exports = Model;
