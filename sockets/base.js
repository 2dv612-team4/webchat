const userHandler = require('../model/DAL/userHandler.js');
const friendHelper = require('./utils/friendHelper');

const emitToSpecificUser = (io, socketId, channel, data) => {
  io.to(socketId).emit(channel, data);
};

module.exports = (io) => {

  io.on('connection', function (socket) {
    /**
     * connecter credentials
     */
    const username = socket.decoded_token.username;
    const userId = socket.decoded_token.id;
    const socketid = socket.id;
    const isPremium = new Date(socket.decoded_token.premiumExpirationDate).getTime() > Date.now();

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
     */
    friendHelper.getFriendsAndPending(username)
      .then(({pending, friends}) => {
        emitToSpecificUser(io, socketid, 'onload-pending', pending);
        emitToSpecificUser(io, socketid, 'onload-friends', friends);
      })
      .catch((e) => emitToSpecificUser(io, socketid, 'servererror', e.message));

    /**
     * removes socket id on client disconnect
     */
    socket.on('disconnect', () =>
      userHandler.setSocketId(userId, null)
        .then(() => console.log('socketId set to null'))
        .catch(() => console.log('error while setting socket id')));

    /**
     * On user wants to send friend request
     */
    socket.on('friend-request', (receiverUsername) =>
      friendHelper.sendFriendRequest(username, receiverUsername)
        .then(({ receiverSocketId, friendrequests, isFriendRequestAlreadyInbound, isFriendRequestAlreadySent, isAlreadyFriend }) => {
          if(isFriendRequestAlreadySent){
            return emitToSpecificUser(io, socketid, 'friend-request-error',
              'Friend request already sent!');
          }else if(isFriendRequestAlreadyInbound){
            return emitToSpecificUser(io, socketid, 'friend-request-error',
              `You already have a pending request from ${receiverUsername}`);
          }else if(isAlreadyFriend){
            return emitToSpecificUser(io, socketid, 'friend-request-error',
              `You are already friends with ${receiverUsername}`);
          }

          emitToSpecificUser(io, receiverSocketId, 'pending', {
            message: `User: ${username}, sent you a friend request.`,
            pending: friendrequests });

          emitToSpecificUser(io, socketid, 'friend-request-response',
            `Friend request sent to ${receiverUsername}`);
        })
        .catch((e) => emitToSpecificUser(io, socketid, 'servererror', e.message)));

    /**
     * On user wants to accsept friend request
     */
    socket.on('accept-friend-request', (id) =>
      friendHelper.acceptFriendRequest(username, id)
        .then(({ receiverSocketId, senderFriends, accepterFriends, accepterPending }) => {
          emitToSpecificUser(io, receiverSocketId, 'friend-request-accepted', {
            message: `${username} accepted your friend request`, friends: senderFriends });

          emitToSpecificUser(io, socketid, 'accept-friend-request-response', {
            message: '', friends: accepterFriends, pending: accepterPending });
        })
      .catch((e) => emitToSpecificUser(io, socketid, 'servererror', e.message)));

    /**
     * On user wants to reject friend request
     */
    socket.on('reject-friend-request', (id) =>
      friendHelper.rejectFriendRequest(username, id)
        .then((pending) =>
          emitToSpecificUser(io, socketid, 'rejected-friend-request-response', {
            pending, message: 'Friend request rejected' })
        )
        .catch((e) => emitToSpecificUser(io, socketid, 'servererror', e.message)));

    /**
     * removes friend based in username of friend
     */
    socket.on('remove-friend', (obj) =>
      friendHelper.removeFriend(username, obj)
        .then(({requesterFriends, receiverSocketId, reciverFriends}) => {
          emitToSpecificUser(io, receiverSocketId, 'friends',
            { message: '', friends: reciverFriends });
          emitToSpecificUser(io, socketid, 'friends',
            { message: '', friends: requesterFriends });
        })
        .catch((e) => emitToSpecificUser(io, socketid, 'servererror', e.message)));

    /**
     * If user wants to update premium
     */
    socket.on('update-premium', (username) => {
      if(isPremium){
        emitToSpecificUser(io, socketid, 'update-premium-response-fail', {
          message: 'You already have premium!' });
      } else {
        let today = new Date();
        let endDate = new Date();
        endDate.setDate(today.getDate() + 30);
        // Should mabye use an util?
        userHandler.updatePremiumExpirationDate(username, endDate)
          .then(() => {
            emitToSpecificUser(io, socketid, 'update-premium-response-success', {
              message: 'You have updated to premium!', isPremium: true });
          })
          .catch((e) => emitToSpecificUser(io, socketid, 'servererror', e.message));
      }
    });
  });
};
