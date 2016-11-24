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
  const username = req.session.loggedIn;
  if(username === ''){
    return res.sendStatus(406);
  }
  userHandler.findWithPartialUsername(username)
    .then(users => {
      res.json(users
        .map(user => ({
          username: user.username,
        }))
        .filter(user => user.username !== username));
    })
    .catch(() => res.sendStatus(500));
});

module.exports = router;
