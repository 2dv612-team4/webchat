'use strict';
const express = require('express');
const userHandler = require('../model/DAL/userHandler.js');
const co = require('co');
const router = express.Router();

// TODO: fix code duplication

/**
 * Sends user friend request
 */
router.post('/sendrequest/:username', function(req, res) {
  if(!req.session.loggedIn){
    return res.sendStatus(401);
  }
  const reciverUsername = req.params.username;
  const requesterUsername = req.session.loggedIn;
  co(function*(){
    const [ requesterUser, reciverUser ] = yield [
      userHandler.findWithUsername(requesterUsername),
      userHandler.findWithUsername(reciverUsername),
    ];
    const isFriendRequsetAlreadySent = reciverUser.friendrequests.find(id =>
      id.toString() === requesterUser._id.toString());
    if(isFriendRequsetAlreadySent){
      return res.sendStatus(304);
    }
    yield userHandler.addFriendRequest(reciverUser._id, requesterUser._id);

    res.sendStatus(200);
  })
  .catch(() => res.sendStatus(500));
});

/**
 * Removes friend requests
 */
router.post('/removerequest/:username', function(req, res){
  if(!req.session.loggedIn){
    return res.sendStatus(401);
  }
  const reciverUsername = req.params.username;
  const requesterUsername = req.session.loggedIn;
  co(function*(){
    const [ requesterUser, reciverUser ] = yield [
      userHandler.findWithUsername(requesterUsername),
      userHandler.findWithUsername(reciverUsername),
    ];

    yield userHandler.removeFriendRequest(reciverUser._id, requesterUser._id);
    res.sendStatus(200);
  })
  .catch(() => res.sendStatus(500));
});

/**
 * Get all user friends
*/
router.get('/', function(req, res){
  if(!req.session.loggedIn){
    return res.sendStatus(401);
  }
  const username = req.session.loggedIn;
  userHandler.findFriendsWithUsername(username)
    .then((user) => res.json(user.friends))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
