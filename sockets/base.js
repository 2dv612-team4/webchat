const userHandler = require('../model/DAL/userHandler.js');
const friends = require('./friends');

module.exports = (io) => {

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

    socket.on('disconnect', function () {
      userHandler.setSocketId(userId, null)
        .then(() => {
          console.log('socketId set to null');
        })
        .catch(() => {
          console.log('error while setting socket id');
        });       
    });

    /**
     * On user wants to send friend request
     */
    socket.on('friend-request', (receiverUsername) => {
      friends.sendFriendRequest(username, receiverUsername)
        .then(({ receiverSocketId, friendrequests, isFriendRequestAlreadyInbound, isFriendRequestAlreadySent, isAlreadyFriends }) => {
          if(isFriendRequestAlreadySent){
            return io.to(socketid).emit('friend-request-error', 'Friend request already sent!');
          }else if(isFriendRequestAlreadyInbound){
            return io.to(socketid).emit('friend-request-error', 'You already have a pending request from target user!');
          }else if(isAlreadyFriends){
            return io.to(socketid).emit('friend-request-error', 'You are already friend with this user!');
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

    /**
     * On user wants to accsept friend request
     */
    socket.on('accept-friend-request', (id) => {
      friends.acceptFriendRequest(username, id)
        .then(({ receiverSocketId, senderFriends, accepterFriends, accepterPending }) => {
          
          io.to(receiverSocketId)
            .emit('friend-request-accepted', {
              message: `${username} accepted your friend request`,
              friends: senderFriends,
            });

          io.to(socketid)
            .emit('accept-friend-request-response', {
              message: '',
              friends: accepterFriends,
              pending: accepterPending,
            });
        })
      .catch((e) => io.to(socketid).emit('servererror', e.message));
    });

    /**
     * On user wants to reject friend request
     */
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