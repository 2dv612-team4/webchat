'use strict';
const express = require('express');
const userHandler = require('../model/DAL/userHandler.js');
const router = express.Router();
const authenticate = require('./utils/authenticate');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/search/:username', authenticate, function(req, res){
  const loggedInUsername = req.session.loggedIn;
  const searchUsername = req.params.username;
  
  if(searchUsername === ''){
    return res.sendStatus(406);
  }
  userHandler.findWithPartialUsername(searchUsername)
    .then(users => {
      res.json(users
        .map(user => ({
          username: user.username,
        }))
        .filter(user => user.username !== loggedInUsername));
    })
    .catch(() => res.sendStatus(500));
});

module.exports = router;
