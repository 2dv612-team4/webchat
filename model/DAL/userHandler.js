'use strict';

const User = require(__dirname + '/Schemas/user.js');
const co = require('co');

const add = (username, password) => new User({username, password}).save();
const findWithUsername = (username) => User.findOne({ username }).exec();
const findWithId = (_id) => User.findOne({_id}).exec();
const getFriendRequests = (username) => User.findOne({username}).populate('friendrequests').exec();
const findAllUsers = () => User.find({}).select('username').exec();
const findFriendsWithUsername = (username) => User.findOne({ username }).populate('friends').exec();
const findWithPartialUsername = (username) => User.find({'username': {'$regex': '^'+username+'.*'}}).exec();

/**
 * updates socketId of user
 */
const setSocketId = (_id, socketId) => User.update({ _id }, { socketId }).exec();

//_id: id of user recieving friend request. requestingUserID: ID of user sending request
const addFriendRequest = (_id, requestingUserID) => User.update({_id}, {$push: {friendrequests: requestingUserID }}).exec();
//_id: id of user that recieved friend request. requestingUserID: ID of user that sent the request
const removeFriendRequest = (_id, requestingUserID) => User.update({_id}, {$pull: {friendrequests: requestingUserID }}).exec();
//adds the users to eachothers friends-array in mongodb
const addFriend = (userID, newFriendID) => new Promise((resolve, reject) => {
  co(function*(){
    const result = yield User.update({_id: userID}, {$push: {friends: newFriendID}}).exec();
    if(result){
      const res = yield User.update({_id: newFriendID}, {$push: {friends: userID}}).exec();
      if(res){
        resolve(true);
      }
    }
  }).catch(() => reject(false));
});
//removes the users from eachothers friends-array in mongodb
const removeFriend = (userID, friendID) => new Promise((resolve, reject) => {
  co(function*(){
    const result = yield User.update({_id: userID}, {$pull: {friends: friendID}}).exec();
    if(result){
      const res = yield User.update({_id: friendID}, {$pull: {friends: userID}}).exec();
      if(res){
        resolve(true);
      }
    }
  }).catch(() => reject(false));
});

//updates the expiration date of premium feature.
const updatePremiumExpirationDate = (username, premiumExpirationDate) => User.update({username}, {premiumExpirationDate}).exec();

module.exports = {
  add: add,
  findWithUsername: findWithUsername,
  findWithId: findWithId,
  addFriendRequest: addFriendRequest,
  addFriend: addFriend,
  removeFriend: removeFriend,
  removeFriendRequest: removeFriendRequest,
  findFriendsWithUsername: findFriendsWithUsername,
  findAllUsers: findAllUsers,
  findWithPartialUsername: findWithPartialUsername,
  getFriendRequests: getFriendRequests,
  setSocketId,
  updatePremiumExpirationDate: updatePremiumExpirationDate,
};
