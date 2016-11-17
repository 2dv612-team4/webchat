'use strict';

const Message = require(__dirname + '/Schemas/message.js');

const add = (userID, roomID, message, timestamp) => new Message({userID, roomID, message, timestamp}).save();
const findMessagesByRoom = (roomID) => Message.findOne({ roomID });

module.exports = {
  add: add,
  findMessagesByRoom: findMessagesByRoom,
};