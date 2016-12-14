const Room = require(__dirname + '/Schemas/room.js');

/**
 * [creates new room]
 * @param {[String]} name      [name of room]
 * @param {[Array]} users     [array of users id's]
 * @param {[Date]} timestamp [Date]
 * @returns {[Promise]} [resoves to object of room]
 */
const add = (name, users, timestamp) => new Room({name, users, timestamp}).save();


/**
 * [gets room by id]
 * @param  {[Object]} _id [room to find]
 * @return {[Promise]}     [Promise resolves to object of room]
 */
const findRoomWithId = (_id) => Room.findOne({ _id });

/**
 * [adds user to room]
 * @param {[Object]} _id    [room to add to]
 * @param {[Object]} userId [user to add to room]
 * @return {[Promise]} [promise]
 */
const addUser = (_id, userId) => Room.update({_id}, {$push: {users: userId }}).exec();

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
 * [addes a message to a room]
 * @param {[Object]} _id     [id of room]
 * @param {[Object]} userId  [id of user who wrote the message]
 * @param {[String]} message [message]
 * @return {[promise]} [returns promise]
 */
const addMessage = (_id, userId, message) => Room.update({_id}, {$push: {messages: {user: userId, message}}}).exec();

const removeSpecificMessage = (_id, messageId) => Room.update({_id}, {$pull: {messages: {_id: messageId}}}).exec();

const removeAllMessages = (_id) =>
  Room.update({_id}, { $set: { messages: [] }}).exec();


module.exports = {
  add,
  findRoomWithId,
  findAllRoomsWithUser,
  addUser,
  addMessage,
  removeAllMessages,
  removeSpecificMessage,
};
