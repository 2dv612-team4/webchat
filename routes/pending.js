'use strict';
const express = require('express');
const userHandler = require('../model/DAL/userHandler.js');
const router = express.Router();

/**
 * Get users pending friend requests
*/
router.get('/', function(req, res){
  if(!req.session.loggedIn){
    return res.sendStatus(401);
  }
  const username = req.session.loggedIn;

  userHandler.getFriendRequests(username)
    .then(responses => {
      let parsedResponse = [];
      responses.friendrequests.forEach(function(obj){
        parsedResponse.push({
          'id': obj._id,
          'username' : obj.username,
        });
      });
      res.json(parsedResponse);
    })
    .catch(() => res.sendStatus(500));
});

module.exports = router;
