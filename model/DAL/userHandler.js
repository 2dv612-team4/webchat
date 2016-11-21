'use strict';

const User = require(__dirname + '/Schemas/user.js');
const co = require('co');

const add = (username, password) => new User({username, password}).save();
const findWithUsername = (username) => User.findOne({ username }).exec();
const findAllUsers = () => User.find({}).select('username').exec();
const findFriendsWithUsername = (username) => User.findOne({ username }).select('friends').exec();

//username: user recieving friend request. requestingUserID: ID of user sending request
const addFriendRequest = (_id, requestingUserID) => User.update({_id}, {$push: {friendrequests: requestingUserID }}).exec();
//username: user that recieved friend request. requestingUserID: ID of user that sent the request
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

module.exports = {
  add: add,
  findWithUsername: findWithUsername,
  addFriendRequest: addFriendRequest,
  addFriend: addFriend,
  removeFriend: removeFriend,
  removeFriendRequest: removeFriendRequest,
  findFriendsWithUsername: findFriendsWithUsername,
  findAllUsers: findAllUsers,
};
