import io from 'socket.io-client';
import * as actionsCreators from '../../../actions/actionCreators';
import { getSocketsToken } from '../dbUser';
import webchatEmitter from '../../emitter';

// TODO:
const init = (store) => {
  
  getSocketsToken()
    .then(responce => responce.json())
    .then((obj) => {
      const server = io('', {
        query: 'token=' + obj.token,
      });
      /*server.on('connect', function (socket) {
      });*/
      // Sockets
      
      /**
       * 
       */
      server.on('onload-username', function (username) {
        store.dispatch(actionsCreators.setUsernameRequests(username));
      });

      /**
       * loads initial pending requests
       */
      server.on('onload-pending', function (pending) {
        store.dispatch(actionsCreators.setPendingRequests(pending));
      });

      /** 
       * loads inital friends 
       * */
      server.on('onload-friends', function (friends) {
        store.dispatch(actionsCreators.setInitialFriends(friends));
      });

      /**
       * updated friends array
       * friends array
       */
      server.on('friends', function (obj) {
        store.dispatch(actionsCreators.setInitialFriends(obj.friends));
      });
      
      /**
       * recives new pending requests
       * and messages
       */
      server.on('pending', function (obj) {
        webchatEmitter.emit('new-pending', obj.message);
        store.dispatch(actionsCreators.setPendingRequests(obj.pending));
      });

      /**
       * recives message after friend request is sent
       */
      server.on('friend-request-response', function(message){
        webchatEmitter.emit('friend-request-success', message);
      });

      /**
       * User X accepted your freind request
       * friends array
       * message
       */
      server.on('friend-request-accepted', function(obj) {
        webchatEmitter.emit('friend-request-success', obj.message);
        store.dispatch(actionsCreators.setInitialFriends(obj.friends));
      });

      /**
       * recives error messages from sent failed friend requests
       */
      server.on('friend-request-error', function(message){
        webchatEmitter.emit('friend-request-error', message);
      });

      /**
       * fired after a successfull 'accept-friend-request' request
       * recives empty message, 
       * friends array
       * pending array
       */
      server.on('accept-friend-request-response', function(obj){
        //webchatEmitter.emit('friend-request-accepted', obj.message);
        store.dispatch(actionsCreators.setInitialFriends(obj.friends));
        store.dispatch(actionsCreators.setPendingRequests(obj.pending));
      });

      /**
       * fired after a successfull 'reject-friend-request' request
       * recives message
       * pending array
       */
      server.on('rejected-friend-request-response', function(obj){
        //webchatEmitter.emit('friend-request-rejected', obj.message);
        store.dispatch(actionsCreators.setPendingRequests(obj.pending));
      });

      server.on('servererror', function(message){
        console.log('server error', message);
      });

      // EventEmitter
      /**
       * Sends friend request user with username
       */
      webchatEmitter.on('friend-request', (username) => {
        server.emit('friend-request', username);
      });

      /**
       * Accsepts friend request from user with id
       */
      webchatEmitter.on('accept-friend-request', (id) => {
        server.emit('accept-friend-request', id);
      });

      /**
       * rejects freind request from user with id
       */
      webchatEmitter.on('reject-friend-request', (id) => {
        server.emit('reject-friend-request', id);
      });

      /**
       * removes friend with username
       */
      webchatEmitter.on('remove-friend', (username) => {
        server.emit('remove-friend', username);
      });

    });
};

export default init;



