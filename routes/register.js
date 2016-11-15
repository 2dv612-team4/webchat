'use strict';
const express = require('express');
const router = express.Router();
const userHandler = require('../model/DAL/userHandler.js');
const co = require('co');

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
    return res.redirect('/register', { message: 'Place holder massage'}); // TODO: enter massage
  }
   
  co(function*(){
    const user = yield userHandler.findWithUsername(username); // SHOULD HASH AND SALT!!
    if(user){
      return res.redirect('/register', { message: 'Place holder massage'}); // TODO: enter massage
    }
    yield userHandler.add(username, password); // SHOULD HASH AND SALT!!
    res.redirect('/', {message: 'Place holder massage'}); // TODO: enter massage
  })
  .catch(() => res.redirect('/register'));  
});

module.exports = router;
