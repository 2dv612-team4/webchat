const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let roomSchema = new Schema({
  name: {type: String, required: true},
  isGroupChat: {type: Boolean, default: false},

  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  ],
  messages: [
    {
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
      message: {type: String, required: true},
      timestamp: {type: Date, default: Date.now, required: true},
    },
  ],
  files: [
    {
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
      filename: {type: String, required: true},
      filepath: {type: String, required: true, unique: true},
      timestamp: {type: Date, default: Date.now, required: true},
    },
  ],
  timestamp: {type: Date, default: Date.now, required: true},
});

let Model = mongoose.model('room', roomSchema);

module.exports = Model;