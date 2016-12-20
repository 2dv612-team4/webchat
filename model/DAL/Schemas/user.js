const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  socketId: {type: String, default: null},
  premiumExpirationDate: {type: Date}, 

  friends: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      chat:  { type: mongoose.Schema.Types.ObjectId, ref: 'room' },
    },
  ],
  friendrequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  ],
});

let Model = mongoose.model('user', userSchema);

module.exports = Model;