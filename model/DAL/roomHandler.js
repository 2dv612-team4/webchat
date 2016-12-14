const Room = require(__dirname + '/Schemas/room.js');

/**
 * [creates new room]
 * @param {[String]} name      [name of room]
 * @param {[Array]} users     [array of users id's]
 * @param {[Date]} timestamp [Date]
 * @returns {[Promise]} [resoves to object of room]
 */
const add = (name, isGroupChat = false) => new Room({name, isGroupChat}).save();

/**
 * [gets room by id]
 * @param  {[Object]} _id [room to find]
 * @return {[Promise]}     [Promise resolves to object of room]
 */
const findRoomWithId = (_id) =>
  Room.findOne({ _id })
  .exec();

/**
 * [gets room by id and populates all fields]
 * @param  {[Object]} _id [room to find]
 * @return {[Promise]}     [Promise resolves to object of room]
 */
const findRoomWithIdAndPopulateAll = (_id) =>
  Room.findOne({ _id })
  .populate({
    path: 'users',
    model: 'user',
    select: 'username socketId -_id',
  })
  .populate({
    path: 'messages.user',
    model: 'user',
    select: 'username -_id',
  })
  .exec();

/**
 * [adds user to room]
 * @param {[Object]} _id    [room to add to]
 * @param {[Object]} userId [user to add to room]
 * @return {[Promise]} [promise]
 */
const addUser = (_id, userId) =>
  Room.update({_id}, {$push: {users: userId }}).exec();

/**
 * [get all rooms that contains user]
 * @param  {[Object]} userId [id of a user]
 * @return {[type]}        [promise resolves to array of rooms]
 */
const findAllRoomsWithUser = (userId) => Room.find({users: { $in: [userId ]}})
  .populate('users')
  .populate({
    path: 'messages.user',
    model: 'user',
  })
  .exec();

/**
 * [gets user with all group chats populated]
 * @param  {String} username
 */
const findAllGroupChatsWithUser = (userId) =>
  Room.find({
    users: { $in: [userId]},
    isGroupChat: true,
  })
  .populate({
    path: 'users',
    model: 'user',
    select: 'username socketId -_id',
  })
  .populate({
    path: 'messages.user',
    model: 'user',
    select: 'username -_id',
  })
  .exec();

/**
 * [insert collection of messages in chat]
 * @param  {String} _id [id of chat]
 * @param  {Array} messages [array of messages objects]
 */
const addMessages = (_id, messages) =>
  Room.update(
    {_id},
    {$pushAll: {messages: messages}})
    .exec();

/**
 * [addes a message to a room]
 * @param {[Object]} _id     [id of room]
 * @param {[Object]} userId  [id of user who wrote the message]
 * @param {[String]} message [message]
 * @return {[promise]} [returns promise]
 */
const addMessage = (_id, userId, message) => Room.update({_id}, {$push: {messages: {user: userId, message}}}).exec();

const removeSpecificMessage = (_id, messageId) => Room.update({_id}, {$pull: {messages: {_id: messageId}}}).exec();

/**
 * [removes all messages from chat]
 * @param  {Object} _id [id of chat]
 */
const removeAllMessages = (_id) =>
  Room.update({_id}, { $set: { messages: [] }}).exec();

/**
 * [removes user from chat]
 * @param  {Object} _id [id of chat]
 * @param  {Object} userId [id of user]
 */
const leaveChat = (_id, userId) =>
  Room.update({_id}, {$pull: {users: userId }}).exec();

/**
 * [Updates chat name]
 * @param  {Object} _id [id of chat]
 * @param  {String} name [new name of chat]
 */
const updateChatName = (_id, name) =>
  Room.update({ _id }, { name }).exec();

const addFile = (_id, userId, fpath, fname) => Room.update({_id}, {$push: {files: {user: userId, filepath: fpath, filename: fname}}}).exec();

module.exports = {
  add,
  findRoomWithId,
  findAllRoomsWithUser,
  addUser,
  addMessage,
  removeAllMessages,
  removeSpecificMessage,
  findAllGroupChatsWithUser,
  addMessages,
  findRoomWithIdAndPopulateAll,
  leaveChat,
  addFile,
  updateChatName,
};
