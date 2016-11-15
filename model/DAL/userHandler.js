'use strict';

const User = require(__dirname + '/Schemas/user.js');

const add = (username, password) => new User({username, password}).save();
const findWithUsername = (username) => User.findOne({ username }).exec();

module.exports = {
  add: add,
  findWithUsername: findWithUsername,
};
