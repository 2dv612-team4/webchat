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
      if (req.body.username == user.username &&
          req.body.password == user.password) {
        console.log('Rätt User');
        req.session.loggedIn = user.username;
        res.send('You are logged in');
        //res.redirect('/redirect');
      } else {
        console.log('Fel User');
        //req.flash('info', 'Wrong username or password!');
        //res.redirect('/redirect');
      }
    });
  }
});

module.exports = router;
