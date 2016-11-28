const userHandler = require('../model/DAL/userHandler.js');
const friends = require('./friends');

module.exports = (io) => {

   // TODO: on disconnect remove socket id

  io.on('connection', function (socket) {
    console.log('onConnection');
    const username = socket.decoded_token.username;
    const userId = socket.decoded_token.id;
    const socketid = socket.id;
    console.log('username', username);
    console.log('socketid', socketid);
    
    userHandler.setSocketId(userId, socketid)
      .then(() => {
        console.log('socketId set!');
      })
      .catch(() => {
        console.log('error while setting socket id');
      }); 
    
    friends.getFriendsAndPending(username)
      .then(({pending, friends}) => {
        io.to(socketid).emit('onload-pending', pending);
        io.to(socketid).emit('onload-friends', friends);
      })
      .catch((e) => io.to(socketid).emit('servererror', e.message));


    socket.on('friend-request', (receiverUsername) => {
      friends.sendFriendRequest(username, receiverUsername)
        .then(({ receiverSocketId, friendrequests, isFriendRequestAlreadyInbound, isFriendRequestAlreadySent }) => {
          if(isFriendRequestAlreadySent){
            return io.to(socketid).emit('friend-request-error', 'Friend request already sent!');
          }else if(isFriendRequestAlreadyInbound){
            return io.to(socketid).emit('friend-request-error', 'You already have a pending request from target user!');
          }

          io.to(receiverSocketId)
            .emit('pending', {
              message: `User: ${username}, sent you a friend request.`,
              pending: friendrequests,
            });

          io.to(socketid)
            .emit('friend-request', `Friend request sent to ${receiverUsername}`);
        })
        .catch((e) => io.to(socketid).emit('servererror', e.message));
    });

    socket.on('accept-friend-request', (id) => {
      friends.acceptFriendRequest(username, id)
        .then(({ receiverSocketId, senderFriends, accepterFriends, accepterPendind }) => {
          
          io.to(receiverSocketId)
            .emit('friends', {
              message: `${username} accepted your friend request`,
              friends: senderFriends,
            });

          io.to(socketid)
            .emit('accepted-friend-request', {
              message: '',
              friends: accepterFriends,
              pending: accepterPendind,
            });
        })
      .catch((e) => io.to(socketid).emit('servererror', e.message));
    });

    socket.on('reject-friend-request', (id) => {
      friends.rejectFriendRequest(username, id)
        .then((pending) => {
          io.to(socketid).emit('rejected-friend-request', {
            pending,
            message: 'Friend request rejected',
          });
        })
        .catch((e) => io.to(socketid).emit('servererror', e.message));
    });

  });
};