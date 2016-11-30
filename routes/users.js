'use strict';
const express = require('express');
const userHandler = require('../model/DAL/userHandler.js');
const router = express.Router();
const authenticate = require('./utils/authenticate');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/sockettoken', authenticate, function(req, res){
  const username = req.session.loggedIn;
  userHandler.findWithUsername(username)
    .then(user => {
      
      const token = jwt.sign({username: user.username, id: user._id, premiumExpirationDate: user.premiumExpirationDate}, config.jwtsecret, { expiresIn: '7d' });
      res.json({token: token});
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
  
});

router.get('/search/:username', authenticate, function(req, res){
  const loggedInUsername = req.session.loggedIn;
  const searchUsername = req.params.username;
  
  if(searchUsername === ''){
    return res.sendStatus(406);
  }
  userHandler.findWithUsername(loggedInUsername).then(({friends}) => {
    userHandler.findWithPartialUsername(searchUsername)
    .then(users => {
      res.json(
        users
        .filter(user => user.username !== loggedInUsername)
        .filter(user => !friends.find(id => id.toString() === user._id.toString()))
        .map(user => ({
          username: user.username,
        })));
    })
    .catch(() => res.sendStatus(500));
  });
});

module.exports = router;
