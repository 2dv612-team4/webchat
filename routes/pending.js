'use strict';
const express = require('express');
const userHandler = require('../model/DAL/userHandler.js');
const router = express.Router();
const authenticate = require('./utils/authenticate');

/**
 * Get users pending friend requests
*/
router.get('/', authenticate, function(req, res){
  const username = req.session.loggedIn;
  let promises = [];
  userHandler.findWithUsername(username)
    .then((user) => user.friendrequests.forEach(function(value){
      promises.push(userHandler.findWithId(value));
    }))
    .then(() => Promise.all(promises))
    .then(responses => {
      let parsedResponse = [];
      responses.forEach(function(obj){
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
