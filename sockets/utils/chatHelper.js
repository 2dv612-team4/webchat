const userHandler = require('../../model/DAL/userHandler.js');
const roomHandler = require('../../model/DAL/roomHandler.js');
const filesHandler = require('../../model/DAL/filesHandler.js');
const co = require('co');
const fs = require('fs-promise');
const path = require('path');
const uuid = require('uuid/v1');


const createChatName = (users) => {
  const participants = users
    .map(({username}) => username)
    .join(', ');

  return `Chat with ${participants}`;
};

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
    const { users, messages } = yield roomHandler.findRoomWithId(friendChatId);

    const oldChatParticipants = yield Promise.all(users.map(user => userHandler.findWithId(user)));
    const userToAddObjects = yield Promise.all(usersToAdd.map(user => userHandler.findWithId(user)));

    const chatName = createChatName(oldChatParticipants.concat(userToAddObjects));

    const groupChat = yield roomHandler.add(chatName, true);

    yield Promise.all(users.map(user => roomHandler.addUser(groupChat._id, user._id)));
    yield Promise.all(usersToAdd.map(user => roomHandler.addUser(groupChat._id, user)));
    yield Promise.all(oldChatParticipants.map(user => roomHandler.addUser(groupChat._id, user)));

    yield roomHandler.addMessages(groupChat._id, messages);

    return roomHandler.findRoomWithIdAndPopulateAll(groupChat._id);
  });

const leavGroupChat =
  co.wrap(function*(username, chatId){
    const user = yield userHandler.findWithUsername(username);
    yield roomHandler.leaveChat(chatId, user._id);

    const chat = yield roomHandler.findRoomWithIdAndPopulateAll(chatId);
    const chatName = createChatName(chat.users);

    yield roomHandler.updateChatName(chatId, chatName);

    return roomHandler.findRoomWithIdAndPopulateAll(chatId);
  });

const addUserToGroupchat =
  co.wrap(function* (chatId, usersToAdd) {
    const { users: oldParticipants } = yield roomHandler.findRoomWithIdAndPopulateAll(chatId);
    yield Promise.all(usersToAdd.map(user => roomHandler.addUser(chatId, user)));

    const chat = yield roomHandler.findRoomWithIdAndPopulateAll(chatId);
    const chatName = createChatName(chat.users);
    yield roomHandler.updateChatName(chatId, chatName);

    const addedUsers = yield Promise.all(usersToAdd.map(user => userHandler.findWithId(user)));
    const groupChat = yield roomHandler.findRoomWithIdAndPopulateAll(chatId);

    return {
      addedUsers,
      oldParticipants,
      groupChat,
    };

  });

/**
 * adds the file and returns the attachment object.
 */
const addFileToRoom =
  co.wrap(function* (roomId, username, file, filename) {
    let unique = uuid();
    let attachment = {filename: filename, uid: unique};
    const user = yield userHandler.findWithUsername(username);
    yield filesHandler.add(file, filename, unique);
    yield roomHandler.addFileRef(roomId, user._id, filename, attachment);
    return attachment;
  });


const removeSpecificMessages = (rooms) => {
  const startdate = new Date();
  let messagesToRemove = [];
  //Loop each friend
  rooms.forEach(function(specificRoom){
    //Loop each message
    specificRoom.messages.forEach(function(specificMessage){
      if(specificMessage.timestamp.getTime() < startdate.setDate(startdate.getDate() - 30)){
        messagesToRemove.push(roomHandler.removeSpecificMessage(specificRoom._id, specificMessage._id));
      }
    });
  });
  Promise.all(messagesToRemove);
};

module.exports = {
  addMessageToRoom,
  removeAllMessagesFromChatRoom,
  createNewGroupChatFromFriendChat,
  leavGroupChat,
  addUserToGroupchat,
  addFileToRoom,
  removeSpecificMessages,
};
