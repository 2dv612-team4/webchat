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
        .then(({ receiverSocketId, friendrequests }) => {
          if(!receiverSocketId || !friendrequests){
            return io.to(socketid).emit('friend-request-error', 'Friend request already sent!');
          }

          io.to(receiverSocketId)
            .emit('pending', {
              message: `User: ${username}, sent you a friend request.`,
              pending: friendrequests,
            });

          io.to(socketid)
            .emit('friend-request-response', `Friend request sent to ${receiverUsername}`);
        })
        .catch((e) => io.to(socketid).emit('servererror', e.message));
    });

    socket.on('accept-friend-request', (id) => {
      friends.acceptFriendRequest(username, id)
        .then(({ receiverSocketId, senderFriends, accepterFriends, accepterPendind }) => {
          
          io.to(receiverSocketId)
            .emit('friend-request-accepted', {
              message: `${username} accepted your friend request`,
              friends: senderFriends,
            });

          io.to(socketid)
            .emit('accept-friend-request-response', {
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
          io.to(socketid).emit('rejected-friend-request-response', {
            pending,
            message: 'Friend request rejected',
          });
        })
        .catch((e) => io.to(socketid).emit('servererror', e.message));
    });

    /**
     * removes friend based in username of friend
     */
    socket.on('remove-friend', (toRemoveUsername) => {
      friends.removeFriend(username, toRemoveUsername)
        .then(({requesterFriends, receiverSocketId, reciverFriends}) => {
          io.to(receiverSocketId)
            .emit('friends', {
              message: '',
              friends: reciverFriends,
            });

          io.to(socketid)
            .emit('friends', {
              message: '',
              friends: requesterFriends,
            });
        })
        .catch((e) => io.to(socketid).emit('servererror', e.message));
    });

  });
};