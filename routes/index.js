'use strict';
const express = require('express');
const router = express.Router();
const user = require('../model/DAL/userHandler.js');

/* GET home page. */
router.get('/', function (req, res) {
  //TODO: Need redirect/sessions
  if(req.session.loggedIn){
    res.send('You are logged in');
  } else {
    res.render('index', { layout: 'index.hbs' });
  }
});

router.post('/', function (req, res) {
  if(req.session.loggedIn) {
    res.send('You are logged in');
  } else {
    user.findWithUsername(req.body.username).then(function(user){
      if(user == null) {
        res.redirect('/');
      } else if (req.body.username == user.username &&
          req.body.password == user.password) {
        req.session.loggedIn = user.username;
        res.redirect('/chatroom');
      } else {
        res.redirect('/');
      }
    }, function(err){
      console.log(err);
      res.redirect('/');
    });
  }
});

router.get('/logout',function(req,res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('User successfully logged out');
      res.redirect('/');
    }
  });
});


module.exports = router;
