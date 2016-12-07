'use strict';

const User = require(__dirname + '/Schemas/user.js');
const co = require('co');

const add = (username, password) => new User({username, password}).save();
const findWithUsername = (username) => User.findOne({ username }).exec();
const findWithId = (_id) => User.findOne({_id}).exec();
const getFriendRequests = (username) => User.findOne({username}).populate('friendrequests').exec();
const findAllUsers = () => User.find({}).select('username').exec();

/**
 * [gets user object with friends array containing users]
 * @param  {[Objet]} type [gets user by type]
 * @return {[Promise]}          [resolves to user object]
 */
const findFriendsWith = (type) => User.findOne(type)
  .populate({
    path: 'friends.user',
    model: 'user',
  })
  .populate({
    path: 'friends.chat',
    model: 'room',
  })
  .exec();

/**
 * [gets user object with friends array containing users]
 * @param  {[String]} username [user to get]
 * @return {[Promise]}          [resolves to user object]
 */
const findFriendsWithUsername = (username) => findFriendsWith({ username });

/**
 * [gets user object with friends array containing users]
 * @param  {[Object]} _id [user to get]
 * @return {[Promise]}          [resolves to user object]
 */
const findFriendsWithId = (_id) => findFriendsWith({ _id });

const findWithPartialUsername = (username) => User.find({'username': {'$regex': '^'+username+'.*'}}).exec();
const changePassword = (_id, newPassword) => User.update({_id}, {$set: {$password: newPassword}}).exec();

/**
 * updates socketId of user
 */
const setSocketId = (_id, socketId) => User.update({ _id }, { socketId }).exec();

//_id: id of user recieving friend request. requestingUserID: ID of user sending request
const addFriendRequest = (_id, requestingUserID) => User.update({_id}, {$push: {friendrequests: requestingUserID }}).exec();
//_id: id of user that recieved friend request. requestingUserID: ID of user that sent the request
const removeFriendRequest = (_id, requestingUserID) => User.update({_id}, {$pull: {friendrequests: requestingUserID }}).exec();
//adds the users to eachothers friends-array in mongodb
const addFriend = (userID, newFriendID, chatId) => new Promise((resolve, reject) => {
  co(function*(){
    const result = yield User.update({_id: userID}, {$push: {
      friends: {
        user: newFriendID,
        chat: chatId,
      }}}).exec();
    if(result){
      const res = yield User.update({_id: newFriendID}, {$push: {
        friends: {
          user: userID,
          chat: chatId,
        }}}).exec();
      if(res){
        resolve(true);
      }
    }
  }).catch(() => reject(false));
});
//removes the users from eachothers friends-array in mongodb
const removeFriend = (userID, friendID, chatID) => new Promise((resolve, reject) => {
  co(function*(){

    const result = yield User.update({_id: userID}, {$pull: {friends: {
      user: friendID,
      chat: chatID,
    }}}).exec();
    if(result){
      const res = yield User.update({_id: friendID}, {$pull: {friends: {
        user: userID,
        chat: chatID,
      }}}).exec();
      if(res){
        resolve(true);
      }
    }
  }).catch(() => reject(false));
});

//updates the expiration date of premium feature.
const updatePremiumExpirationDate = (username, premiumExpirationDate) => User.update({username}, {premiumExpirationDate}).exec();

module.exports = {
  add,
  findWithUsername,
  findWithId,
  addFriendRequest,
  addFriend,
  removeFriend,
  removeFriendRequest,
  findFriendsWithUsername,
  findFriendsWithId,
  findAllUsers,
  findWithPartialUsername,
  getFriendRequests,
  setSocketId,
  updatePremiumExpirationDate,
  changePassword,
};
