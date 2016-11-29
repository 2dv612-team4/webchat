const userHandler = require('../model/DAL/userHandler.js');
const co = require('co');

// TODO: add comments
//userHandler.removeFriendRequest('5837867333bc3736491b0322','5837866b33bc3736491b0321');
//userHandler.removeFriendRequest('5836199444a765f7cc404f90','5837866b33bc3736491b0321');

// TODO: decuple this function, remove io, socketid dependency
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
    return { receiverSocketId, friendrequests, isFriendRequestAlreadyInbound: false, isFriendRequestAlreadySent: false };
  });

const rejectFriendRequest =  
  co.wrap(function*(username, id){
    const receiverUser = yield userHandler.findWithUsername(username);
    yield userHandler.removeFriendRequest(receiverUser._id, id);
    const { friendrequests } = yield userHandler.getFriendRequests(username);
    return friendrequests;
  });
  
const acceptFriendRequest =  
  co.wrap(function*(username, id){
    const receiverUser = yield userHandler.findWithUsername(username);
    yield userHandler.addFriend(receiverUser._id, id);
    yield userHandler.removeFriendRequest(receiverUser._id, id);
    const { friends: accepterFriends } =  yield userHandler.findFriendsWithUsername(username);
    const { friendrequests:  accepterPending } = yield userHandler.getFriendRequests(username);
    const senderUser = yield userHandler.findWithId(id);
    const {friends: senderFriends, socketId: receiverSocketId} = yield userHandler.findFriendsWithUsername(senderUser.username);

    return { receiverSocketId, senderFriends, accepterFriends, accepterPending };
  });

const getFriendsAndPending =  
  co.wrap(function*(username){
    const [{friendrequests: userFriendrequests}, {friends: userFriends} ] =  yield [
      userHandler.getFriendRequests(username),
      userHandler.findFriendsWithUsername(username),
    ];
    const pending = userFriendrequests.map(request => ({
      _id: request._id,
      username: request.username,
    }));

    const friends = userFriends.map(request => ({
      _id: request._id,
      username: request.username,
    }));
    return { pending, friends };
  });

const removeFriend = 
  co.wrap(function*(username, toRemoveUsername){
    const [ userOne, userTwo ] = yield [
      userHandler.findWithUsername(username),
      userHandler.findWithUsername(toRemoveUsername),
    ];
    yield userHandler.removeFriend(userOne._id, userTwo._id);
    
    const [
        { friends: requesterFriends }, 
        { friends: reciverFriends },
      ] = yield [
        userHandler.findFriendsWithUsername(username),
        userHandler.findFriendsWithUsername(toRemoveUsername),
      ];

    return {
      requesterFriends, 
      receiverSocketId: userTwo.socketId, 
      reciverFriends,
    };
  });

module.exports = {
  rejectFriendRequest,
  acceptFriendRequest,
  getFriendsAndPending,
  sendFriendRequest,
  removeFriend,
};