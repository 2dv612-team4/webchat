const userHandler = require('../../model/DAL/userHandler.js');
const roomHandler = require('../../model/DAL/roomHandler.js');
const co = require('co');

/**
 * Removes unvanted user infomation
 */
//= (users) => users.map(getOnlyIdAndUsername; 
//const getOnlyIdAndUsername = ({ _id, username }) => ({  _id, username });

/**
 * [sends friend request to user with username]
 * @param  {String} username [username of user who send request]
 * @param  {String} receiverUsername [username of user who recives request]
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
      return {receiverSocketId: null, friendrequests: null, isFriendRequestAlreadyInbound: false, isFriendRequestAlreadySent: true, isAlreadyFriend: false};
    }

    const isAlreadyFriend = receiverUser.friendrequests.find(id =>
      id.toString() === requesterUser._id.toString());
    if(isAlreadyFriend){
      return {receiverSocketId: null, friendrequests: null, isFriendRequestAlreadyInbound: false, isFriendRequestAlreadySent: true, isAlreadyFriend: true};
    }


    const isFriendRequestAlreadyInbound = requesterUser.friendrequests.find(id =>
      id.toString() === receiverUser._id.toString());
    if(isFriendRequestAlreadyInbound){
      return {receiverSocketId: null, friendrequests: null, isFriendRequestAlreadyInbound: true, isFriendRequestAlreadySent: false, isAlreadyFriend: false}; 
    }
    yield userHandler.addFriendRequest(receiverUser._id, requesterUser._id);
    
    const { socketId: receiverSocketId, friendrequests } = yield userHandler.getFriendRequests(receiverUsername);

    return { 
      receiverSocketId, 
      friendrequests: friendrequests, 
      isFriendRequestAlreadyInbound: false, 
      isFriendRequestAlreadySent: false,
      isAlreadyFriend: false, 
    };
  });


/**
 * [rejects friend request]
 * @param  {String} username [username of a user]
 * @param  {String} id [id of a user]
 * @return {Promise}
 */
const rejectFriendRequest =  
  co.wrap(function*(username, id){
    const receiverUser = yield userHandler.findWithUsername(username);
    yield userHandler.removeFriendRequest(receiverUser._id, id);
    const { friendrequests } = yield userHandler.getFriendRequests(username);
    return friendrequests;
  });

/**
 * [accepts friend request]
 * @param  {String} username [username of a user]
 * @param  {String} id [id of a user]
 * @return {Promise}
 */
const acceptFriendRequest =
  co.wrap(function*(username, id){
    const userToAccept = yield userHandler.findWithUsername(username);
    const userWhoSentRequest = yield userHandler.findWithId(id);

    const room = yield roomHandler.add(`Chat with ${userToAccept.username} and ${userWhoSentRequest.username}`);
    yield roomHandler.addUser(room._id, userToAccept._id);
    yield roomHandler.addUser(room._id, userWhoSentRequest._id);

    yield userHandler.addFriend(userToAccept._id, userWhoSentRequest._id, room._id);
    yield userHandler.removeFriendRequest(userToAccept._id, id);

    const { friends: accepterFriends } =  yield userHandler.findFriendsWithUsername(username);
    const { friendrequests:  accepterPending } = yield userHandler.getFriendRequests(username);

    const senderUser = yield userHandler.findWithId(id);
    const {friends: userToAcceptFriends, socketId: receiverSocketId} = yield userHandler.findFriendsWithUsername(senderUser.username);

    return { 
      receiverSocketId, 
      senderFriends: userToAcceptFriends, 
      accepterFriends: accepterFriends, 
      accepterPending: accepterPending,
    };
  });


/**
 * [gets friends array and pending array from user by username]
 * @param  {String} username
 * @return {Promise}
 */
const getFriendsAndPending =  
  co.wrap(function*(username){
    const [{friendrequests: pending}, { friends } ] =  yield [
      userHandler.getFriendRequests(username),
      userHandler.findFriendsWithUsername(username),
    ];
    return { 
      pending: pending, 
      friends: friends, 
    };
  }); 

/**
 * [removed friend from user by username]
 * @param  {String} username [username of requester]
 * @param  {Object} obj [object with username and chatId]
 * @return {promise} []
 */
const removeFriend = 
  co.wrap(function*(username, obj){
    const [ requesterUser, userToRemove, room ] = yield [
      userHandler.findWithUsername(username),
      userHandler.findWithUsername(obj.username),
      roomHandler.findRoomWithId(obj.chatId),
    ];
    yield userHandler.removeFriend(requesterUser._id, userToRemove._id, room._id);
    
    const [
        { friends: requesterFriends }, 
        { friends: reciverFriends },
      ] = yield [
        userHandler.findFriendsWithUsername(username),
        userHandler.findFriendsWithUsername(obj.username),
      ];

    return {
      requesterFriends: requesterFriends, 
      receiverSocketId: userToRemove.socketId, 
      reciverFriends: reciverFriends,
    };
  });

module.exports = {
  rejectFriendRequest,
  acceptFriendRequest,
  getFriendsAndPending,
  sendFriendRequest,
  removeFriend,
};