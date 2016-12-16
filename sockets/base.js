const userHandler = require('../model/DAL/userHandler.js');
const friendHelper = require('./utils/friendHelper');
const chatHelper = require('./utils/chatHelper');
const bcrypt = require('bcrypt-nodejs');

const emitToSpecificUser = (io, socketId, channel, data) =>
  io.to(socketId).emit(channel, data);

const joinSocketRoomForFriend = (socket, friend) =>
  socket.join(friend.chat._id.toString());

const joinSocketRoomForGroupChat = (socket, groupchat) =>
  socket.join(groupchat._id.toString());

module.exports = (io) => {
  io.on('connection', function (socket) {
    /**
     * connecter credentials
     */
    const username = socket.decoded_token.username;
    const userId = socket.decoded_token.id;
    const socketid = socket.id;
    const isPremium = new Date(socket.decoded_token.premiumExpirationDate).getTime() > Date.now();

    console.log('Connected with username: ' + username);

    /**
     * sets socketId on client connect
     */
    userHandler.setSocketId(userId, socketid)
      .then(() => console.log('socketId set!'))
      .catch(() => console.log('error while setting socket id'));

    /**
     * sends username of logged in user
     */
    emitToSpecificUser(io, socketid, 'onload-username', username);

    /**
     * sends premium status of logged in user
     */
    emitToSpecificUser(io, socketid, 'set-is-premium', isPremium);

    /**
     * sends inital friends and pending data
     * joins socket rooms from every friend
     */
    friendHelper.getFriendsPendingAndGroupChats(username)
      .then(({pending, friends, groupchats}) => {
        groupchats.forEach(groupchat => joinSocketRoomForGroupChat(socket, groupchat));
        friends.forEach(friend => joinSocketRoomForFriend(socket, friend));
        emitToSpecificUser(io, socketid, 'onload-pending', pending);

        /*
        * Remove messages over 30 days old on autenticate
        */
        let friendArray = [];
        friends.forEach(function(friend){
          friendArray.push(friend.chat);
        });
        chatHelper.removeSpecificMessages(groupchats);
        chatHelper.removeSpecificMessages(friendArray);

        emitToSpecificUser(io, socketid, 'onload-friends', friends);
        emitToSpecificUser(io, socketid, 'onload-groupchats', groupchats);
      })
      .catch((e) => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'getFriendsPendingAndGroupChats'}));

    /**
     * removes socket id on client disconnect
     */
    socket.on('disconnect', () =>
      userHandler.setSocketId(userId, null)
        .then(() => console.log('socketId set to null'))
        .catch(() => console.log('error while setting socket id'))
    );

    socket.on('join-chat-rooms', () =>
      friendHelper.getFriendsPendingAndGroupChats(username)
        .then(({friends, groupchats}) =>{
          friends.forEach(friend => joinSocketRoomForFriend(socket, friend));
          groupchats.forEach(groupchat => joinSocketRoomForGroupChat(socket, groupchat));
        })
        .catch((e) => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'join-chat-rooms'}))
    );

    /**
     * On user wants to send friend request
     */
    socket.on('friend-request', (receiverUsername) =>
      friendHelper.sendFriendRequest(username, receiverUsername)
        .then(({ receiverSocketId, friendrequests, isFriendRequestAlreadyInbound, isFriendRequestAlreadySent, isAlreadyFriend }) => {
          if (isFriendRequestAlreadySent) {
            return emitToSpecificUser(io, socketid, 'friend-request-error',
              'Friend request already sent!');
          } else if (isFriendRequestAlreadyInbound) {
            return emitToSpecificUser(io, socketid, 'friend-request-error',
              `You already have a pending request from ${receiverUsername}`);
          } else if (isAlreadyFriend) {
            return emitToSpecificUser(io, socketid, 'friend-request-error',
              `You are already friends with ${receiverUsername}`);
          }

          emitToSpecificUser(io, receiverSocketId, 'pending', {
            message: `User: ${username}, sent you a friend request.`,
            pending: friendrequests,
          });

          emitToSpecificUser(io, socketid, 'friend-request-response',
            `Friend request sent to ${receiverUsername}`);
        })
        .catch((e) => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'friend-request'})));

    /**
     * On user wants to accsept friend request
     */
    socket.on('accept-friend-request', (id) =>
      friendHelper.acceptFriendRequest(username, id)
        .then(({ receiverSocketId, senderFriends, accepterFriends, accepterPending }) => {
          emitToSpecificUser(io, receiverSocketId, 'friend-request-accepted', {
            message: `${username} accepted your friend request`, friends: senderFriends,
          });

          emitToSpecificUser(io, socketid, 'accept-friend-request-response', {
            message: '', friends: accepterFriends, pending: accepterPending,
          });
        })
      .catch((e) => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'accept-friend-request'})));

    /**
     * On user wants to reject friend request
     */
    socket.on('reject-friend-request', (id) =>
      friendHelper.rejectFriendRequest(username, id)
        .then((pending) =>
          emitToSpecificUser(io, socketid, 'rejected-friend-request-response', {
            pending, message: 'Friend request rejected',
          })
        )
        .catch((e) => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'reject-friend-request'})));

    /**
     * removes friend based in username of friend
     */
    socket.on('remove-friend', (obj) =>
      friendHelper.removeFriend(username, obj)
        .then(({requesterFriends, receiverSocketId, reciverFriends}) => {
          emitToSpecificUser(io, receiverSocketId, 'remove-friend',
            { message: '', friends: reciverFriends, chatId: obj.chatId });

          emitToSpecificUser(io, socketid, 'remove-friend',
            { message: '', friends: requesterFriends, chatId: obj.chatId });
        })
        .catch((e) => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'remove-friend'})));

    /**
     * If user wants to update premium
     */
    socket.on('update-premium', (username) => {
      if (isPremium) {
        emitToSpecificUser(io, socketid, 'update-premium-response-fail', {
          message: 'You already have premium!',
        });
      } else {
        let today = new Date();
        let endDate = new Date();
        endDate.setDate(today.getDate() + 30);
        // Should mabye use an util?
        userHandler.updatePremiumExpirationDate(username, endDate)
          .then(() => {
            emitToSpecificUser(io, socketid, 'update-premium-response-success', {
              message: 'You have updated to premium!', isPremium: true,
            });
          })
          .catch((e) => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'update-premium'}));
      }
    });

    socket.on('send-chat-message', (obj) =>
      chatHelper.addMessageToRoom(obj.chatId, username, obj.message)
      .then(() => {
        io.sockets.in(obj.chatId).emit('update-chat', {username, message: obj.message, chatId: obj.chatId});
      })
      .catch((e) => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'send-chat-message'}))
    );

    socket.on('upload-file', (obj, filename) => 
    chatHelper.addFileToRoom(obj.chatId, username, obj.file, filename)
      .then(() => {
        io.sockets.in(obj.chatId).emit('update-chat', {username, message: filename, chatId: obj.chatId}); //does not add a download link yet
      }).catch((e) => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'upload-file'})));
    
    /**
     * [clears chat history]
     * @param  {String} chatId [id of chat to clear]
     */
    socket.on('clear-chat-history', (chatId) =>
      chatHelper.removeAllMessagesFromChatRoom(chatId)
        .then((chatname) => {
          io.sockets.in(chatId).emit('clear-chat', {chatId, chatname});
        })
        .catch(e => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'clear-chat-history'})));

    /**
     * Creates new group chat with messages from friends chat
     * obj
     *  chatId: string
     *  usersToAdd: array
     */
    socket.on('create-new-group-chat-from-friend-chat', (obj) =>
      chatHelper.createNewGroupChatFromFriendChat(obj.chatId, obj.usersToAdd)
        .then((chat) => {
          chat.users.forEach(user =>
            emitToSpecificUser(io, user.socketId, 'new-groupchat', {
              message: `You joined groupchat ${chat.name}`,
              chat,
            }));
        })
        .catch((e) => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'create-new-group-chat-from-friend-chat'})));

    socket.on('add-user-to-group-chat', (obj) =>
      chatHelper.addUserToGroupchat(obj.chatId, obj.usersToAdd)
        .then(({addedUsers, groupChat: chat, oldParticipants}) => {
          console.log(JSON.stringify(chat, null, 2));
          addedUsers.forEach(user =>
            emitToSpecificUser(io, user.socketId, 'new-groupchat', {
              message: `You joined groupchat ${chat.name}`,
              chat,
            }));

          oldParticipants.forEach(user =>
            emitToSpecificUser(io, user.socketId, 'update-groupchat', {
              message: `New people joined ${chat.name}`,
              chat,
            }));
        })
        .catch((e) => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'add-user-to-group-chat'})));

    /**
     * Leave groupchat
     */
    socket.on('leave-groupchat', (chatId) =>
      chatHelper.leavGroupChat(username, chatId)
        .then((chat) => {
          socket.leave(chatId);
          emitToSpecificUser(io, socketid, 'remove-groupchat', chatId);

          chat.users.forEach(user =>
            emitToSpecificUser(io, user.socketId, 'update-groupchat', {
              message: `User ${username} left ${chat.name}`,
              chat,
            }));

        })
        .catch((e) => emitToSpecificUser(io, socketid, 'servererror', {server: e.message, socketId: 'leave-groupchat'})));

    /*
    * If user wants to Update Password
    */
    socket.on('update-password', (username, oldpassword, newPassword) => {
      userHandler.findWithUsername(username).then((user) => {
        bcrypt.compare(oldpassword, user.password, function (err, isPasswordCorrect) {
          if (isPasswordCorrect) {
            bcrypt.hash(newPassword, null, null, (err, hash) => {
              userHandler.changePassword(username, hash).then(() => {
                emitToSpecificUser(io, socketid, 'update-password-response-success', {
                  message: 'You have updated your password!',
                });
              }).catch((e) => emitToSpecificUser(io, socketid, 'servererror', e.message));
            });

          } else {
            emitToSpecificUser(io, socketid, 'update-password-response-fail', {
              message: 'Wrong old password!',
            });
          }
        });
      });
    });

  });
};
