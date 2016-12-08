const userHandler = require('../../model/DAL/userHandler.js');
const roomHandler = require('../../model/DAL/roomHandler.js');
const co = require('co');

const addMessageToRoom = 
  co.wrap(function*(roomId, username, message){
    const user = yield userHandler.findWithUsername(username);
    return yield roomHandler.addMessage(roomId, user._id, message);
  });


module.exports = {
  addMessageToRoom,
};