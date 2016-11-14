'use strict';
const express = require('express');
const router = express.Router();
const user = require('../model/DAL/userHandler.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  //TODO: Need redirect/sessions
  res.render('index', { layout: 'index.hbs' });
  console.log(user)
});

router.post('/', function (req, res) {
  var userFromDb = user.findWithUsername(req.body.username);
  console.log(userFromDb);
  if (req.body.username == userFromDb.username && 
      req.body.password == userFromDb.password) {
    console.log("Rätt User")
    //req.session.username = username;
    //res.redirect('/redirect');
  } else {
    console.log("Fel User")
    req.flash("info", "Wrong username or password!");
    //res.redirect('/redirect');
  }
});

module.exports = router;
