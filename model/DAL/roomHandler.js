'use strict';

const Room = require(__dirname + '/Schemas/room.js');

const add = (name, users, timestamp) => new Room({name, users, timestamp}).save();
const findRoomWithId = (roomID) => Room.findOne({ roomID });

module.exports = {
  add: add,
  findRoomWithId: findRoomWithId,
};