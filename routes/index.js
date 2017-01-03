'use strict';
const express = require('express');
const router = express.Router();
const user = require('../model/DAL/userHandler.js');
const bcrypt = require('bcrypt-nodejs');
const filesHandler = require('../model/DAL/filesHandler.js');
const fsys = require('fs-promise');
const path = require('path');
const co = require('co');
const admin = 'admin';


/* GET start page. */
router.get('/', function(req, res){
  // If session is set, redirect to the chat.
  // Else render login page.
  if(req.session.loggedIn){
    user.findWithUsername(req.session.loggedIn).then(function(user){

      if(user.banned){
        console.log('User is banned!');
        res.render('index', { layout: 'index.hbs' });
        //TODO: Give feedback to user that he is banned.
      }
      res.redirect('/chatroom');
    });
  }
  res.render('index', { layout: 'index.hbs' });

});

/* POST login form. */
router.post('/', function(req, res){
  // If session is set, redirect to chat.
  // Else get user on username from Login form
  if(req.session.loggedIn){
    res.redirect('/chatroom');
  }else{
    user.findWithUsername(req.body.username).then(function(user){
      // If user is null, return to login page
      // Else if user is banned, retur to login page
      // Else try to login
      if (user == null){
        console.log('Failed to login! User is null');
        res.redirect('/');
      }else if(user.banned){
        console.log('User is banned!');
        res.redirect('/');
        //TODO: Give feedback to user that he is banned.
      }else{
        const formUsername = req.body.username;
        const formPassword = req.body.password;
        const dbUsername = user.username;
        const dbPasswordHash = user.password;
        // If username and password from form is the same as username and
        // password from db, set session and redirect to chatroom
        // Else username and/or password was wrong
        bcrypt.compare(formPassword, dbPasswordHash, function(err, isPasswordCorrect){
          if(err){
            console.log('Error', err);
            return res.redirect('/');
          }

          if(formUsername == admin && formUsername == dbUsername && isPasswordCorrect){
            req.session.loggedIn = admin;
            res.redirect('/admin');
          }else if(formUsername == dbUsername && isPasswordCorrect){
            req.session.loggedIn = dbUsername;
            res.redirect('/chatroom');
          }else{
            console.log('Wrong username or password!');
            res.redirect('/');
          }
        });

      }
      // Redirect to login page if something went wrong in the db
    }, function(err){
      console.log(err);
      res.redirect('/');
    });
  }
});

/* GET logout. */
router.get('/logout', function(req, res){
  // Destroy the session and redirect to login page
  req.session.destroy(function (err){
    if(err){
      console.log(err);
    }else{
      console.log('User successfully logged out');
      res.redirect('/');
    }
  });
});

router.get('/download/:id', function(req, res) {
  co(function*(){
    const dir = path.join(__dirname, '../public/tmpfiles/');
    const exists = yield fsys.exists(dir);
    if(!exists) {
      yield fsys.mkdir(dir);
    }
    const file = yield filesHandler.findWithUID(req.params.id);
    yield fsys.writeFile(dir+file.filename, file.buffer);
    res.download(path.join(dir, file.filename));
  }).catch(() => res.send('Failed to get file'));
});

module.exports = router;
