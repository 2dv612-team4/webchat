const userHandler = require('../model/DAL/userHandler.js');
const co = require('co');

/**
 * Removes unvanted user infomation
 */
const serializeUsers = (users) => users.map(getOnlyIdAndUsername); 
const getOnlyIdAndUsername = ({ _id, username }) => ({  _id, username });

/**
 * sends friend request to user with username
 * returns
 *  - receiverSocketId from user to send request to
 *  - friendrequests from user to send request to
 *  - isFriendRequestAlreadySent 
 *  - isFriendRequestAlreadyInbound
 */
const sendFriendRequest = 
  co.wrap(function*(username, receiverUsername){
    const [ requesterUser, receiverUser ] = yield [
      userHandler.findWithUsername(username),
      userHandler.findWithUsername(receiverUsername),
    ];
    
    const isFriendRequestAlreadySent = receiverUser.friendrequests.find(id =>
      id.toString() === requesterUser._id.toString());
    if(isFriendRequestAlreadySent){
      return {receiverSocketId: null, friendrequests: null, isFriendRequestAlreadyInbound: false, isFriendRequestAlreadySent: true};
    }

    const isFriendRequestAlreadyInbound = requesterUser.friendrequests.find(id =>
      id.toString() === receiverUser._id.toString());
    if(isFriendRequestAlreadyInbound){
      return {receiverSocketId: null, friendrequests: null, isFriendRequestAlreadyInbound: true, isFriendRequestAlreadySent: false}; 
    }
    yield userHandler.addFriendRequest(receiverUser._id, requesterUser._id);
    
    const { socketId: receiverSocketId, friendrequests } = yield userHandler.getFriendRequests(receiverUsername);

    return { 
      receiverSocketId, 
      friendrequests: serializeUsers(friendrequests), 
      isFriendRequestAlreadyInbound: false, 
      isFriendRequestAlreadySent: false, 
    };
  });

/**
 * rejects friend request
 * returns
 *  - friendrequests array from user that rejects friend request 
 */
const rejectFriendRequest =  
  co.wrap(function*(username, id){
    const receiverUser = yield userHandler.findWithUsername(username);
    yield userHandler.removeFriendRequest(receiverUser._id, id);
    const { friendrequests } = yield userHandler.getFriendRequests(username);
    return serializeUsers(friendrequests);
  });

/**
 * accepts friend request
 * returns
 *  - socketId from friend how got accepted
 *  - friends array from friend how got accepted
 *  - friends array from user that accepted
 *  - pending array from user that accepted 
 */
const acceptFriendRequest =  
  co.wrap(function*(username, id){
    const userToAccept = yield userHandler.findWithUsername(username);
    yield userHandler.addFriend(userToAccept._id, id);
    yield userHandler.removeFriendRequest(userToAccept._id, id);

    const { friends: accepterFriends } =  yield userHandler.findFriendsWithUsername(username);
    const { friendrequests:  accepterPending } = yield userHandler.getFriendRequests(username);

    const senderUser = yield userHandler.findWithId(id);
    const {friends: userToAcceptFriends, socketId: receiverSocketId} = yield userHandler.findFriendsWithUsername(senderUser.username);

    return { 
      receiverSocketId, 
      senderFriends: serializeUsers(userToAcceptFriends), 
      accepterFriends: serializeUsers(accepterFriends), 
      accepterPending: serializeUsers(accepterPending),
    };
  });

/**
 * gets friends array and pending array from user by username
 */
const getFriendsAndPending =  
  co.wrap(function*(username){
    const [{friendrequests: pending}, { friends } ] =  yield [
      userHandler.getFriendRequests(username),
      userHandler.findFriendsWithUsername(username),
    ];
    return { 
      pending: serializeUsers(pending), 
      friends: serializeUsers(friends), 
    };
  }); 

/**
 * removes friend from user by username
 * returns 
 *  - friends array for both users 
 *  - socketId for removed friend
 */
const removeFriend = 
  co.wrap(function*(username, toRemoveUsername){
    const [ requesterUser, userToRemove ] = yield [
      userHandler.findWithUsername(username),
      userHandler.findWithUsername(toRemoveUsername),
    ];
    yield userHandler.removeFriend(requesterUser._id, userToRemove._id);
    
    const [
        { friends: requesterFriends }, 
        { friends: reciverFriends },
      ] = yield [
        userHandler.findFriendsWithUsername(username),
        userHandler.findFriendsWithUsername(toRemoveUsername),
      ];

    return {
      requesterFriends: serializeUsers(requesterFriends), 
      receiverSocketId: userToRemove.socketId, 
      reciverFriends: serializeUsers(reciverFriends),
    };
  });

module.exports = {
  rejectFriendRequest,
  acceptFriendRequest,
  getFriendsAndPending,
  sendFriendRequest,
  removeFriend,
};