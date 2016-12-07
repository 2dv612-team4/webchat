'use strict';
const express = require('express');
const router = express.Router();
const userHandler = require('../model/DAL/userHandler.js');
const co = require('co');
const bcrypt = require('bcrypt-nodejs');
const saltrounds = 10;
/* GET home page. */
router.get('/', function(req, res) {
  res.render('register', {layout: 'register.hbs'});
});

/**
 *
 */
router.post('/', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const repeatPassword = req.body.repeatPassword;

  if(password !== repeatPassword){
    return res.redirect('/register');
  }
  co(function*(){
    const user = yield userHandler.findWithUsername(username);
    if(user){
      return res.redirect('/register');
    }
    bcrypt.hash(password, null, null, (err, hash) => {
      if(err){
        console.log('Error', err);
        return res.redirect('/');
      }
      userHandler.add(username, hash)
        .then(() => res.redirect('/'))
        .catch(() => res.redirect('/register'))            
    });


  })
  .catch(() => res.redirect('/register'));
});

module.exports = router;
