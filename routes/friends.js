'use strict';
const express = require('express');
const userHandler = require('../model/DAL/userHandler.js');
const co = require('co');
const authenticate = require('./utils/authenticate');
const router = express.Router();
// TODO: fix code duplication

/**
 * Sends user friend request
 */
router.post('/sendrequest/:username', authenticate, function(req, res) {
  const receiverUsername = req.params.username;
  const requesterUsername = req.session.loggedIn;
  co(function*(){
    const [ requesterUser, receiverUser ] = yield [
      userHandler.findWithUsername(requesterUsername),
      userHandler.findWithUsername(receiverUsername),
    ];
    const isFriendRequestAlreadySent = receiverUser.friendrequests.find(id =>
      id.toString() === requesterUser._id.toString());
    if(isFriendRequestAlreadySent){
      return res.sendStatus(304);
    }
    yield userHandler.addFriendRequest(receiverUser._id, requesterUser._id);

    res.sendStatus(200);
  })
  .catch(() => res.sendStatus(500));
});

/**
 * Removes a sent friend request
 */
router.post('/removerequest/:username', authenticate, function(req, res){
  const receiverUsername = req.params.username;
  const requesterUsername = req.session.loggedIn;
  co(function*(){
    const [ requesterUser, receiverUser ] = yield [
      userHandler.findWithUsername(requesterUsername),
      userHandler.findWithUsername(receiverUsername),
    ];

    yield userHandler.removeFriendRequest(receiverUser._id, requesterUser._id);
    res.sendStatus(200);
  })
  .catch(() => res.sendStatus(500));
});

/**
 * Accepts a friend request
 */
router.post('/acceptrequest/:id', authenticate, function(req, res){
  const requesterUserId = req.params.id;
  const receiverUsername = req.session.loggedIn;
  co(function*(){
    const receiverUser = yield userHandler.findWithUsername(receiverUsername);
    yield userHandler.addFriend(receiverUser._id, requesterUserId);
    yield userHandler.removeFriendRequest(receiverUser._id, requesterUserId);
    res.sendStatus(200);
  })
  .catch(() => res.sendStatus(500));
});

/**
 * Rejects a friend request
 */
router.post('/rejectrequest/:id', authenticate, function(req, res){
  const requesterUserId = req.params.id;
  const receiverUsername = req.session.loggedIn;
  co(function*(){
    const receiverUser = yield userHandler.findWithUsername(receiverUsername);
    yield userHandler.removeFriendRequest(receiverUser._id, requesterUserId);
    res.sendStatus(200);
  })
  .catch(() => res.sendStatus(500));
});

/**
 * Get all user friends
*/
router.get('/', authenticate, function(req, res){
  const username = req.session.loggedIn;
  userHandler.findFriendsWithUsername(username)
    .then((user) => res.json(user.friends))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
