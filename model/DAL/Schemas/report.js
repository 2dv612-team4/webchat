const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let reportSchema = new Schema({
  reporteduser: {type: String, required: true},
  reportedby: {type: String, required: true},
  reason: {type: String, required: true},
  timestamp: {type: Date, default: Date.now, required: true},
});

let Model = mongoose.model('report', reportSchema);

module.exports = Model;