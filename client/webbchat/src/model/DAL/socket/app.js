import io from 'socket.io-client';
import * as actionsCreators from '../../../actions/actionCreators';
import { getSocketsToken } from '../dbUser';
import webchatEmitter from '../../emitter';

// TODO:
const init = (store) => {

  getSocketsToken()
    .then(response => response.json())
    .then((obj) => {
      const socket = io('', {
        query: 'token=' + obj.token,
      });

      /**
       * loads initail username... 
       */
      socket.on('onload-username', function (username) {
        store.dispatch(actionsCreators.setUsernameRequests(username));
      });

      /**
       * loads initial pending requests
       */
      socket.on('onload-pending', function (pending) {
        store.dispatch(actionsCreators.setPendingRequests(pending));
      });

      /**
       * loads inital friends
       * */
      socket.on('onload-friends', function (friends) {
        
        friends.forEach(({chat}) =>
          store.dispatch(actionsCreators.addChat(chat)));

        store.dispatch(actionsCreators.setInitialFriends(friends));
      });

      /**
       * on friend remove
       * friends array
       */
      socket.on('remove-friend', function (obj) {
        store.dispatch(actionsCreators.removeChat(obj.chatId));
        store.dispatch(actionsCreators.setInitialFriends(obj.friends));
      });

      /**
       * recives new pending requests
       * and messages
       */
      socket.on('pending', function (obj) {
        webchatEmitter.emit('new-pending', obj.message);
        store.dispatch(actionsCreators.setPendingRequests(obj.pending));
      });

      /**
       * recives message after friend request is sent
       */
      socket.on('friend-request-response', function(message){
        webchatEmitter.emit('friend-request-success', message);
      });

      /**
       * User X accepted your freind request
       * friends array
       * message
       */
      socket.on('friend-request-accepted', function(obj) {
        socket.emit('join-chat-rooms');
        obj.friends.forEach(({chat}) =>
          store.dispatch(actionsCreators.addChat(chat)));
        webchatEmitter.emit('friend-request-success', obj.message);
        store.dispatch(actionsCreators.setInitialFriends(obj.friends));
      });

      /**
      pending array * recives error messages from sent failed friend requests
       */
      socket.on('friend-request-error', function(message){
        webchatEmitter.emit('friend-request-error', message);
      });

      /**
       * fired after a successfull 'accept-friend-request' request
       * recives empty message,
       * friends array
       * pending array
       */
      socket.on('accept-friend-request-response', function(obj){
        socket.emit('join-chat-rooms');
        
        obj.friends.forEach(({chat}) =>
          store.dispatch(actionsCreators.addChat(chat)));

        store.dispatch(actionsCreators.setInitialFriends(obj.friends));
        store.dispatch(actionsCreators.setPendingRequests(obj.pending));
      });

      /**
       * fired after a successfull 'reject-friend-request' request
       * recives message
       * pending array
       */
      socket.on('rejected-friend-request-response', function(obj){
        //webchatEmitter.emit('friend-request-rejected', obj.message);
        store.dispatch(actionsCreators.setPendingRequests(obj.pending));
      });

      /**
       * set premium state
       */
      socket.on('set-is-premium', function (isPremium) {
        store.dispatch(actionsCreators.setIsPremium(isPremium));
      });

      socket.on('servererror', function(message){
        console.log('server error', message);
      });

      /**
       * on new chat messages
       */
      socket.on('update-chat', function (obj) {
        store.dispatch(actionsCreators.addMessage(obj.chatId, obj.username, obj.message));
      });

      /**
       * on clear chat
       */
      socket.on('clear-chat', function (chat) {
        store.dispatch(actionsCreators.clearAllMessages(chat.chatId));
      });

      // EventEmitter
      /**
       * Send message to the current chatroom
       */
      webchatEmitter.on('send-chat-message', (message) => {
        socket.emit('send-chat-message', message);
      });

      /**
       * Sends friend request user with username
       */
      webchatEmitter.on('friend-request', (username) => {
        socket.emit('friend-request', username);
      });

      /**
       * Accsepts friend request from user with id
       */
      webchatEmitter.on('accept-friend-request', (id) => {
        socket.emit('accept-friend-request', id);
      });

      /**
       * rejects freind request from user with id
       */
      webchatEmitter.on('reject-friend-request', (id) => {
        socket.emit('reject-friend-request', id);
      });

      /**
       * removes friend with username
       */
      webchatEmitter.on('remove-friend', (obj) => {
        socket.emit('remove-friend', { username: obj.username, chatId: obj.chatId});
      });

      /**
       * sends event to clear chat history
       */
      webchatEmitter.on('clear-chat-history', (chatId) => {
        socket.emit('clear-chat-history', chatId);
      });

      /**
       * Add premium
       */
      webchatEmitter.on('update-premium', (username) => {
        socket.emit('update-premium', username);
      });

      socket.on('update-premium-response-fail', function(obj){
        webchatEmitter.emit('update-premium-response-fail-snackbar', obj.message);
      });

      socket.on('update-premium-response-success', function(obj){
        store.dispatch(actionsCreators.setIsPremium(obj.isPremium));
        webchatEmitter.emit('update-premium-response-success-snackbar', obj.message);
      });

      webchatEmitter.on('buy-premium', (wantToBuy) => {
        store.dispatch(actionsCreators.buyAdPremium(wantToBuy));
      });

      /*
      * Password stuff
      */
      webchatEmitter.on('change-password-settings', (wantToChangePassword) => {
        store.dispatch(actionsCreators.changeUserPassword(wantToChangePassword));
      });

      webchatEmitter.on('update-password', (username, oldPassword, newPassword) => {
        socket.emit('update-password', username, oldPassword, newPassword);
      });

      socket.on('update-password-response-fail', function(obj){
        webchatEmitter.emit('update-password-response-fail-snackbar', obj.message);
      });

      socket.on('update-password-response-success', function(obj){
        webchatEmitter.emit('update-password-response-success-snackbar', obj.message);
      });
    });
};

export default init;
