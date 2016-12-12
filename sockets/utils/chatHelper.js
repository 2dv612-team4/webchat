const userHandler = require('../../model/DAL/userHandler.js');
const roomHandler = require('../../model/DAL/roomHandler.js');
const co = require('co');

const addMessageToRoom = 
  co.wrap(function*(roomId, username, message){
    const user = yield userHandler.findWithUsername(username);
    return yield roomHandler.addMessage(roomId, user._id, message);
  });


const removeAllMessagesFromChatRoom = 
  co.wrap(function*(chatId){
    yield roomHandler.removeAllMessages(chatId);
    const chat = yield roomHandler.findRoomWithId(chatId);
    return chat.name;

  })

module.exports = {
  addMessageToRoom,
  removeAllMessagesFromChatRoom,
};