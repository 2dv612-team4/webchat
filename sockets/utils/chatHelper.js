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
  });

const createNewGroupChatFromFriendChat = 
  co.wrap(function*(friendChatId, usersToAdd){
    const { users, messages } = yield roomHandler.findRoomWithId(friendChatId); // old chat

    const usersObjects = yield Promise.all(users.map(user => userHandler.findWithId(user))); // all users in old chat

    const chatParticipants = usersObjects
      .map(({username}) => username)
      .join(', ');

    const groupChat = yield roomHandler.add(`Chat with ${chatParticipants}`, true);

    yield Promise.all(users.map(user => roomHandler.addUser(groupChat._id, user._id)));
    yield Promise.all(usersToAdd.map(user => roomHandler.addUser(groupChat._id, user)));
    yield Promise.all(usersObjects.map(user => roomHandler.addUser(groupChat._id, user)));
    
    yield roomHandler.addMessages(groupChat._id, messages);

    return roomHandler.findRoomWithIdAndPopulateAll(groupChat._id);
  });

const leavGroupChat = 
  co.wrap(function*(username, chatId){
    const user = yield userHandler.findWithUsername(username);
    yield roomHandler.leaveChat(chatId, user._id);
    return roomHandler.findRoomWithIdAndPopulateAll(chatId);
  });

module.exports = {
  addMessageToRoom,
  removeAllMessagesFromChatRoom,
  createNewGroupChatFromFriendChat,
  leavGroupChat,
};