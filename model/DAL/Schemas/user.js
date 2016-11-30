'use strict';

const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  socketId: {type: String},
  premiumExpirationDate: {type: Date, default: new Date('1970-01-01T01:00:00.000Z')}, 

  friends: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  ],
  rooms: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'room' },
  ],
  friendrequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  ],
});

let Model = mongoose.model('user', userSchema);

module.exports = Model;