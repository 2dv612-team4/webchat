'use strict';
const express = require('express');
const router = express.Router();
const user = require('../model/DAL/userHandler.js');
const bcrypt = require('bcrypt');

/* GET start page. */
router.get('/', function (req, res) {
  // If session is set, redirect to the chat.
  // Else render login page.
  if (req.session.loggedIn) {
    res.redirect('/chatroom');
  } else {
    res.render('index', { layout: 'index.hbs' });
  }
});

/* POST login form. */
router.post('/', function (req, res) {
  // If session is set, redirect to chat.
  // Else get user on username from Login form
  if (req.session.loggedIn) {
    res.redirect('/chatroom');
  } else {
    user.findWithUsername(req.body.username).then(function (user) {
      // If user is null, return to login page
      // Else try to login
      if (user == null) {
        console.log('Failed to login! User is null');
        res.redirect('/');
      } else {
        const formUsername = req.body.username;
        const formPassword = req.body.password;
        const dbUsername = user.username;
        const dbPasswordHash = user.password;
        // If username and password from form is the same as username and
        // password from db, set session and redirect to chatroom
        // Else username and/or password was wrong
        bcrypt.compare(formPassword, dbPasswordHash).then(function (isPasswordCorrect) {
          if (formUsername == dbUsername && isPasswordCorrect) {
            req.session.loggedIn = dbUsername;
            res.redirect('/chatroom');
          } else {
            console.log('Wrong username or password!');
            res.redirect('/');
          }
        });

      }
      // Redirect to login page if something went wrong in the db
    }, function (err) {
      console.log(err);
      res.redirect('/');
    });
  }
});

/* GET logout. */
router.get('/logout', function (req, res) {
  // Destroy the session and redirect to login page
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
