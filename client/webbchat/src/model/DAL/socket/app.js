import io from 'socket.io-client';
import * as actionsCreators from '../../../actions/actionCreators';
import { getSocketsToken } from '../dbUser';
import webchatEmitter from '../../emitter';

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
       * recives new pending requests
       * and messages
       */
      server.on('pending', function (obj) {
        webchatEmitter.emit('new-pending', obj.message);
        store.dispatch(actionsCreators.setPendingRequests(obj.pending));
      });

      /**
       * recives new friends
       */
      server.on('friends', function (obj) {
        webchatEmitter.emit('friend-request-success', obj.message);
        store.dispatch(actionsCreators.setInitialFriends(obj.friends));
      });

      /**
       * recives message after friend request is sent
       */
      server.on('friend-request', function(message){
        webchatEmitter.emit('friend-request-success', message);
      });

      /**
       * recives error messages from sent friend requests
       */
      server.on('friend-request-error', function(message){
        webchatEmitter.emit('friend-request-error', message);
      });

      /**
       * recives message, friends array
       */
      server.on('accepted-friend-request', function(obj){
        //webchatEmitter.emit('friend-request-accepted', obj.message);
        store.dispatch(actionsCreators.setInitialFriends(obj.friends));
        store.dispatch(actionsCreators.setPendingRequests(obj.pending));
      });

      /**
       * recives message
       */
      server.on('rejected-friend-request', function(obj){
        webchatEmitter.emit('friend-request-rejected', obj.message);
        store.dispatch(actionsCreators.setPendingRequests(obj.pending));
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



