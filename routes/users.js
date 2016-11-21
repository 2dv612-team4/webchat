'use strict';
const express = require('express');
const userHandler = require('../model/DAL/userHandler.js');
const co = require('co');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/search/:username', function(req, res){
  if(!req.session.loggedIn){
    return res.sendStatus(401);
  }
  const username = req.params.username;
  if(username === ''){
    return res.sendStatus(406);
  }
  userHandler.findWithPartialUsername(username)
    .then((users) => {
      res.json(users.map((user) => {
        return {
          username: user.username,
        };
      }));
    })
    .catch(() => res.sendStatus(500));
});

module.exports = router;
