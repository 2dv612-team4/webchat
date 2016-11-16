'use strict';
const index = require('./index');
const express = require('express');
var hbs = require('hbs');
const router = express.Router();

/* GET chatroom page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn) {
    hbs.registerPartial('user', req.session.loggedIn);
    res.render('chatroom', {layout: 'chatroom.hbs'});
  } else {
    res.redirect('/');
  }
});

module.exports = router;
