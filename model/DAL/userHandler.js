'use strict';

const User = require(__dirname + '/Schemas/user.js');
const Room = require(__dirname + '/Schemas/room.js');
const co = require('co');

const add = (username, password) => new User({username, password}).save();
const findWithUsername = (username) => User.findOne({ username }).exec();
const findWithId = (_id) => User.findOne({_id}).exec();
const getFriendRequests = (username) => User.findOne({username}).populate('friendrequests').exec();
const findAllUsers = () => User.find({}).select('username').exec();
const deleteUserAccount = (username) => User.find({username}).remove().exec();

/**
 * [gets user object with friends array containing users]
 * @param  {[Objet]} type [gets user by type]
 * @return {[Promise]}          [resolves to user object]
 */
const findFriendsWith = (type) =>
  new Promise((resolve, reject) => {
    User.findOne(type)
    .populate({
      path: 'friends.user',
      model: 'user',
      select: 'username _id',
    })
    .exec(function(err, user){
      if(err){
        return reject(err);
      }
      Room.populate(user, {
        path: 'friends.chat',
        model: 'room',
        select: '-__v',
      }, function(err, user){
        if(err){
          return reject(err);
        }
        User.populate(user, {
          path: 'friends.chat.messages.user',
          model: 'user',
          select: 'username -_id',
        }, function(err, user){
          if(err){
            return reject(err);
          }

          User.populate(user, {
            path: 'friends.chat.users',
            model: 'user',
            select: 'username -_id',
          }, function(err, user){
            if(err){
              return reject(err);
            }
            resolve(user);
          });



          //resolve(user);
        });
      });
    });
  });

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
const changePassword = (username, password) => User.update({username}, {$set: {password}}).exec();

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
  deleteUserAccount,
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
  changePassword,
  setSocketId,
  updatePremiumExpirationDate,
};
