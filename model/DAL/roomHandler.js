'use strict';

const Room = require(__dirname + '/Schemas/room.js');

const add = function (_name, _users) {
  let newRoom = new Room({
    name: _name,
    users: _users,
    timestamp: new Date(),
  });

  newRoom.save(function (err) {
    if (err) {
      console.log('failed to create room. Error: \n' + err);
      return;
    }
    console.log('room created');
  });
};

const findRoomWithId = function (id) {
  return new Promise((resolve, reject) => {
    Room.findOne({ '_id': id }, function (err, room) {
      if (err) {
        return reject(err);
      }
      return resolve(room);
    });
  });
};

module.exports = {
  add: add,
  findRoomWithId: findRoomWithId,
};