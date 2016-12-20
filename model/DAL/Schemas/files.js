const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let filesSchema = new Schema({
  buffer: {type: Buffer, required: true},
  filename: {type: String, required: true},
  uid: {type: String, required: true, unique: true},
});

let Model = mongoose.model('files', filesSchema);

module.exports = Model;