'use strict';

const User = require(__dirname + '/Schemas/user.js');

const add = (username, password) => new User({username, password}).save();
const findWithUsername = (username) => User.findOne({ username }).exec();
const findAllUsers = () => User.find({}).select('username').exec();
const findFriendsWithUsername = (username) => User.findOne({ username }).select('friends').exec();

module.exports = {
  add: add,
  findWithUsername: findWithUsername,
  findFriendsWithUsername: findFriendsWithUsername,
  findAllUsers: findAllUsers
};
